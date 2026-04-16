import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { apiService } from "../../redux/apis/APIService"
import { APIsEndPoints } from "../../redux/apis/APIsEndpoints"
import { Loading } from "../../components/common/loading.jsx"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, BellRing, Building2, FileText, Megaphone, Search } from "lucide-react"

export const EmployeeNoticesPage = () => {
    const dispatch = useDispatch()
    const [notices, setNotices] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    const fetchNotices = async () => {
        try {
            setIsLoading(true)
            const response = await apiService.get(APIsEndPoints.MY_NOTICES, { withCredentials: true })
            setNotices(response.data?.data || [])
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch notices")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchNotices()
    }, [])

    const filteredNotices = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return notices
        return notices.filter((notice) => [notice.title, notice.content, notice.audience, notice.createdby?.firstname, notice.createdby?.lastname].filter(Boolean).some((field) => field.toString().toLowerCase().includes(term)))
    }, [notices, searchTerm])

    const departmentNotices = notices.filter((n) => n.audience === "Department-Specific")
    const personalNotices = notices.filter((n) => n.audience === "Employee-Specific")

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="employee-notices-container min-[250px]:mx-1 sm:mx-2 w-auto h-full min-h-0 flex flex-col gap-4 overflow-hidden py-2">
            <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white shadow-lg">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 min-[250px]:flex-col md:flex-row">
                        <div>
                            <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Announcements</p>
                            <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2 flex items-center gap-2"><BellRing className="w-8 h-8" /> My Notices</h1>
                            <p className="text-slate-200 mt-2 max-w-2xl">View company notices and announcements in the same polished style as the HR dashboard.</p>
                        </div>
                        <Badge className="bg-white/10 text-white border-white/20">{notices.length} notices</Badge>
                    </div>

                    <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3">
                        <Search className="w-5 h-5 text-blue-100 shrink-0" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search notices"
                            className="w-full bg-transparent outline-none placeholder:text-slate-300 text-white"
                        />
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3"><div className="flex items-center gap-2 text-blue-100 text-sm"><Bell className="w-4 h-4" /> Total</div><div className="text-2xl font-bold mt-1">{notices.length}</div></div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3"><div className="flex items-center gap-2 text-blue-100 text-sm"><Building2 className="w-4 h-4" /> Department</div><div className="text-2xl font-bold mt-1">{departmentNotices.length}</div></div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3"><div className="flex items-center gap-2 text-blue-100 text-sm"><Megaphone className="w-4 h-4" /> Personal</div><div className="text-2xl font-bold mt-1">{personalNotices.length}</div></div>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                    <button onClick={fetchNotices} className="ml-4 underline hover:no-underline">
                        Try Again
                    </button>
                </div>
            )}

            <div className="notices-list flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
                {filteredNotices.length === 0 ? (
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-8 text-center">
                            <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                            <p className="text-slate-700 text-lg mb-2">No notices available</p>
                            <p className="text-slate-500 text-sm">You will be notified when new notices are posted.</p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredNotices.map((notice) => (
                        <Card key={notice._id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    {notice.audience === "Department-Specific" && <Badge className="bg-purple-100 text-purple-800">Department Notice</Badge>}
                                    {notice.audience === "Employee-Specific" && <Badge className="bg-green-100 text-green-800">Personal Notice</Badge>}
                                </div>
                                <h3 className="font-bold text-xl text-slate-900">{notice.title}</h3>
                                <p className="text-slate-600 whitespace-pre-wrap mt-3">{notice.content}</p>
                                <div className="mt-4 pt-3 border-t flex justify-between items-center text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-700 font-bold text-sm">{notice.createdby?.firstname?.charAt(0) || "H"}</span>
                                        </div>
                                        <span>{notice.createdby ? `${notice.createdby.firstname} ${notice.createdby.lastname}` : "HR"}</span>
                                    </div>
                                    <div className="text-right">
                                        <p>{new Date(notice.createdAt).toLocaleDateString()}</p>
                                        <p className="text-xs">{new Date(notice.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
