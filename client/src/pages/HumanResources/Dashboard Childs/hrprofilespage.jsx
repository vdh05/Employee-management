import { useEffect, useMemo, useState } from "react"
import { apiService } from "../../../redux/apis/apiService"
import { HREndPoints } from "../../../redux/apis/APIsEndpoints"
import { Loading } from "../../../components/common/loading.jsx"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Search, ShieldCheck, Users } from "lucide-react"

const formatDate = (value) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return "—"
    return date.toLocaleDateString()
}

export const HRProfilesPage = () => {
    const [profiles, setProfiles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const loadHRProfiles = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const response = await apiService.get(HREndPoints.GETALL, { withCredentials: true })
                setProfiles(Array.isArray(response.data?.data) ? response.data.data : [])
            } catch (fetchError) {
                setError(fetchError?.response?.data?.message || "Failed to load HR profiles")
                setProfiles([])
            } finally {
                setIsLoading(false)
            }
        }

        loadHRProfiles()
    }, [])

    const filteredProfiles = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()
        if (!normalizedSearch) return profiles

        return profiles.filter((profile) => {
            const departmentName = profile.department?.name || ""
            return [profile.firstname, profile.lastname, profile.email, departmentName, profile.contactnumber]
                .filter(Boolean)
                .some((field) => field.toLowerCase().includes(normalizedSearch))
        })
    }, [profiles, searchTerm])

    const verifiedCount = profiles.filter((profile) => profile.isverified).length
    const departmentLinkedCount = profiles.filter((profile) => Boolean(profile.department)).length

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="hr-profiles-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white p-5 shadow-lg border border-white/10">
                <div className="flex items-start justify-between gap-4 min-[250px]:flex-col lg:flex-row lg:items-center">
                    <div>
                        <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Human Resources</p>
                        <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2">HR Profiles</h1>
                        <p className="text-slate-200 mt-2 max-w-2xl">
                            Review every HR account in the organization, including verification status, contact details, and department assignment.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm">
                                <Users className="w-4 h-4" /> Total
                            </div>
                            <div className="text-2xl font-bold mt-1">{profiles.length}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm">
                                <ShieldCheck className="w-4 h-4" /> Verified
                            </div>
                            <div className="text-2xl font-bold mt-1">{verifiedCount}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm">
                                <Building2 className="w-4 h-4" /> Department
                            </div>
                            <div className="text-2xl font-bold mt-1">{departmentLinkedCount}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3">
                    <Search className="w-5 h-5 text-blue-100 shrink-0" />
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search by name, email, contact, or department"
                        className="w-full bg-transparent outline-none placeholder:text-slate-300 text-white"
                    />
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700">
                    {error}
                </div>
            )}

            <div className="hr-profiles-data flex flex-col gap-4 md:pe-5 overflow-auto flex-1">
                {filteredProfiles.length > 0 ? (
                    <div className="grid gap-4 xl:grid-cols-2">
                        {filteredProfiles.map((profile) => (
                            <Card key={profile._id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900">
                                                {profile.firstname} {profile.lastname}
                                            </h2>
                                            <p className="text-sm text-slate-500 mt-1">HR ID: {profile._id}</p>
                                        </div>
                                        <Badge variant={profile.isverified ? "default" : "secondary"} className={profile.isverified ? "bg-emerald-600 hover:bg-emerald-600" : "bg-slate-200 text-slate-700"}>
                                            {profile.isverified ? "Verified" : "Pending"}
                                        </Badge>
                                    </div>

                                    <div className="grid gap-3 mt-5 sm:grid-cols-2">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                                                <Mail className="w-4 h-4" /> Email
                                            </div>
                                            <div className="mt-1 text-sm font-medium text-slate-900 break-all">{profile.email || "—"}</div>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                                                <Phone className="w-4 h-4" /> Contact
                                            </div>
                                            <div className="mt-1 text-sm font-medium text-slate-900">{profile.contactnumber || "—"}</div>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                                                <Building2 className="w-4 h-4" /> Department
                                            </div>
                                            <div className="mt-1 text-sm font-medium text-slate-900">{profile.department?.name || "Unassigned"}</div>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                                                <ShieldCheck className="w-4 h-4" /> Joined
                                            </div>
                                            <div className="mt-1 text-sm font-medium text-slate-900">{formatDate(profile.createdAt)}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Badge variant="outline" className="border-blue-200 text-blue-800 bg-blue-50">
                                            {profile.role || "HR-Admin"}
                                        </Badge>
                                        <Badge variant="outline" className="border-slate-200 text-slate-700 bg-slate-50">
                                            Last login: {formatDate(profile.lastlogin)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="wrapper-container p-2 border-2 border-blue-700 rounded-lg w-auto flex-1 flex items-center justify-center min-h-[240px] bg-white">
                        <div className="text-center max-w-md px-4">
                            <p className="text-slate-900 text-xl font-semibold">No HR profiles found.</p>
                            <p className="text-slate-500 mt-2">
                                {searchTerm ? "Try a different search term." : "Create or verify HR accounts to populate this directory."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
