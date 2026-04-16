import { useEffect, useMemo, useState } from "react"
import { apiService } from "../../../redux/apis/APIService"
import { ApplicantEndPoints, HRDepartmentPageEndPoints, RecruitmentEndPoints } from "../../../redux/apis/APIsEndpoints"
import { Loading } from "../../../components/common/loading.jsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BriefcaseBusiness, Building2, ChevronRight, CircleAlert, Filter, Plus, Search, Users } from "lucide-react"

const initialRecruitmentForm = {
    jobtitle: "",
    description: "",
    departmentID: "",
}

const applicantStatusOptions = ["Not Specified", "Pending", "Conduct-Interview", "Interview Completed", "Rejected"]

const statusClasses = {
    "Not Specified": "bg-slate-100 text-slate-700",
    Pending: "bg-amber-100 text-amber-700",
    "Conduct-Interview": "bg-blue-100 text-blue-700",
    "Interview Completed": "bg-cyan-100 text-cyan-700",
    Rejected: "bg-rose-100 text-rose-700",
}

const formatDate = (value) => {
    if (!value) return "—"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return "—"
    return date.toLocaleDateString()
}

const normalizeText = (value) => (value || "").toString().toLowerCase()

export const HRRecruitmentPage = () => {
    const [recruitments, setRecruitments] = useState([])
    const [applicants, setApplicants] = useState([])
    const [departments, setDepartments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedRecruitment, setSelectedRecruitment] = useState(null)
    const [recruitmentForm, setRecruitmentForm] = useState(initialRecruitmentForm)
    const [applicantDrafts, setApplicantDrafts] = useState({})

    const loadRecruitmentData = async () => {
        try {
            setIsLoading(true)
            setError(null)

            const [recruitmentResponse, applicantResponse, departmentResponse] = await Promise.all([
                apiService.get(RecruitmentEndPoints.GETALL, { withCredentials: true }),
                apiService.get(ApplicantEndPoints.GETALL, { withCredentials: true }),
                apiService.get(HRDepartmentPageEndPoints.GETALL, { withCredentials: true }),
            ])

            setRecruitments(Array.isArray(recruitmentResponse.data?.data) ? recruitmentResponse.data.data : [])
            setApplicants(Array.isArray(applicantResponse.data?.data) ? applicantResponse.data.data : [])
            setDepartments(Array.isArray(departmentResponse.data?.data) ? departmentResponse.data.data : [])
        } catch (fetchError) {
            setError(fetchError?.response?.data?.message || "Failed to load recruitment data")
            setRecruitments([])
            setApplicants([])
            setDepartments([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadRecruitmentData()
    }, [])

    const filteredRecruitments = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return recruitments

        return recruitments.filter((item) => {
            const departmentName = item.department?.name || item.department?.departmentname || ""
            return [item.jobtitle, item.description, departmentName]
                .filter(Boolean)
                .some((field) => normalizeText(field).includes(term))
        })
    }, [recruitments, searchTerm])

    const filteredApplicants = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        if (!term) return applicants

        return applicants.filter((item) => {
            return [item.firstname, item.lastname, item.email, item.contactnumber, item.appliedrole, item.recruitmentstatus]
                .filter(Boolean)
                .some((field) => normalizeText(field).includes(term))
        })
    }, [applicants, searchTerm])

    const recruitmentCount = recruitments.length
    const applicantCount = applicants.length
    const pendingApplicants = applicants.filter((applicant) => applicant.recruitmentstatus === "Pending").length
    const interviewApplicants = applicants.filter((applicant) => ["Conduct-Interview", "Interview Completed"].includes(applicant.recruitmentstatus)).length

    const handleCreateRecruitment = async () => {
        if (!recruitmentForm.jobtitle.trim() || !recruitmentForm.description.trim()) return

        await apiService.post(
            RecruitmentEndPoints.CREATE,
            {
                jobtitle: recruitmentForm.jobtitle.trim(),
                description: recruitmentForm.description.trim(),
                departmentID: recruitmentForm.departmentID || undefined,
            },
            { withCredentials: true }
        )

        setRecruitmentForm(initialRecruitmentForm)
        setIsCreateOpen(false)
        await loadRecruitmentData()
    }

    const openEditDialog = (recruitment) => {
        setSelectedRecruitment(recruitment)
        setRecruitmentForm({
            jobtitle: recruitment.jobtitle || "",
            description: recruitment.description || "",
            departmentID: recruitment.department?._id || recruitment.department || "",
        })
        setIsEditOpen(true)
    }

    const handleUpdateRecruitment = async () => {
        if (!selectedRecruitment || !recruitmentForm.jobtitle.trim() || !recruitmentForm.description.trim()) return

        await apiService.patch(
            RecruitmentEndPoints.UPDATE,
            {
                recruitmentID: selectedRecruitment._id,
                jobtitle: recruitmentForm.jobtitle.trim(),
                description: recruitmentForm.description.trim(),
                departmentID: recruitmentForm.departmentID,
            },
            { withCredentials: true }
        )

        setIsEditOpen(false)
        setSelectedRecruitment(null)
        setRecruitmentForm(initialRecruitmentForm)
        await loadRecruitmentData()
    }

    const handleDeleteRecruitment = async () => {
        if (!selectedRecruitment) return

        await apiService.delete(RecruitmentEndPoints.DELETE(selectedRecruitment._id), { withCredentials: true })
        setIsDeleteOpen(false)
        setSelectedRecruitment(null)
        await loadRecruitmentData()
    }

    const handleApplicantStatusChange = (applicantID, value) => {
        setApplicantDrafts((current) => ({
            ...current,
            [applicantID]: value,
        }))
    }

    const handleSaveApplicantStatus = async (applicant) => {
        const nextStatus = applicantDrafts[applicant._id] ?? applicant.recruitmentstatus ?? "Not Specified"
        await apiService.patch(
            ApplicantEndPoints.UPDATE,
            {
                applicantID: applicant._id,
                UpdatedData: {
                    recruitmentstatus: nextStatus,
                },
            },
            { withCredentials: true }
        )

        await loadRecruitmentData()
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="recruitment-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white p-5 shadow-lg border border-white/10">
                <div className="flex items-start justify-between gap-4 min-[250px]:flex-col xl:flex-row xl:items-center">
                    <div>
                        <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Talent Acquisition</p>
                        <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2">Recruitment</h1>
                        <p className="text-slate-200 mt-2 max-w-3xl">
                            Manage job openings and track applicant progress from one HR dashboard.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => setIsCreateOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100">
                            <Plus className="w-4 h-4 mr-2" /> New Opening
                        </Button>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3">
                    <Search className="w-5 h-5 text-blue-100 shrink-0" />
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search openings or applicants"
                        className="w-full bg-transparent outline-none placeholder:text-slate-300 text-white"
                    />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                        <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <BriefcaseBusiness className="w-4 h-4" /> Openings
                        </div>
                        <div className="text-2xl font-bold mt-1">{recruitmentCount}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                        <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <Users className="w-4 h-4" /> Applicants
                        </div>
                        <div className="text-2xl font-bold mt-1">{applicantCount}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                        <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <Filter className="w-4 h-4" /> Pending
                        </div>
                        <div className="text-2xl font-bold mt-1">{pendingApplicants}</div>
                    </div>
                    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                        <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <ChevronRight className="w-4 h-4" /> Interview Flow
                        </div>
                        <div className="text-2xl font-bold mt-1">{interviewApplicants}</div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 flex items-center gap-2">
                    <CircleAlert className="w-4 h-4" /> {error}
                </div>
            )}

            <div className="recruitment-data flex flex-col gap-4 md:pe-5 overflow-auto flex-1">
                <div className="grid gap-4 xl:grid-cols-2">
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Open Roles</h2>
                                    <p className="text-sm text-slate-500">Current recruitment records in this organization.</p>
                                </div>
                                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                    {filteredRecruitments.length} shown
                                </Badge>
                            </div>

                            <div className="grid gap-3">
                                {filteredRecruitments.length > 0 ? (
                                    filteredRecruitments.map((recruitment) => (
                                        <div key={recruitment._id} className="rounded-xl border border-slate-200 p-4 hover:border-blue-300 transition-colors bg-white">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900">{recruitment.jobtitle}</h3>
                                                    <p className="text-sm text-slate-500 mt-1">Created {formatDate(recruitment.createdAt)}</p>
                                                </div>
                                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                                    {Array.isArray(recruitment.application) ? recruitment.application.length : 0} applicants
                                                </Badge>
                                            </div>

                                            <div className="mt-3 text-sm text-slate-600 leading-6">
                                                {recruitment.description}
                                            </div>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                                    <Building2 className="w-3.5 h-3.5 mr-1" />
                                                    {recruitment.department?.name || recruitment.department?.departmentname || "No Department"}
                                                </Badge>
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <Button variant="outline" size="sm" onClick={() => openEditDialog(recruitment)}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => {
                                                        setSelectedRecruitment(recruitment)
                                                        setIsDeleteOpen(true)
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                                        No recruitment openings match your search.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Applicant Pipeline</h2>
                                    <p className="text-sm text-slate-500">Review applicants and update their interview stage.</p>
                                </div>
                                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                    {filteredApplicants.length} shown
                                </Badge>
                            </div>

                            <div className="grid gap-3">
                                {filteredApplicants.length > 0 ? (
                                    filteredApplicants.map((applicant) => {
                                        const draftStatus = applicantDrafts[applicant._id] ?? applicant.recruitmentstatus ?? "Not Specified"

                                        return (
                                            <div key={applicant._id} className="rounded-xl border border-slate-200 p-4 bg-white">
                                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900">
                                                            {applicant.firstname} {applicant.lastname}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 mt-1">Applied for {applicant.appliedrole}</p>
                                                    </div>
                                                    <Badge className={statusClasses[applicant.recruitmentstatus] || statusClasses["Not Specified"]}>
                                                        {applicant.recruitmentstatus || "Not Specified"}
                                                    </Badge>
                                                </div>

                                                <div className="grid gap-2 mt-4 sm:grid-cols-2 text-sm text-slate-600">
                                                    <div>
                                                        <span className="font-semibold text-slate-700">Email:</span> {applicant.email}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-slate-700">Contact:</span> {applicant.contactnumber}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-slate-700">Applied:</span> {formatDate(applicant.createdAt)}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-slate-700">ID:</span> {applicant._id}
                                                    </div>
                                                </div>

                                                <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
                                                    <select
                                                        value={draftStatus}
                                                        onChange={(event) => handleApplicantStatusChange(applicant._id, event.target.value)}
                                                        className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white"
                                                    >
                                                        {applicantStatusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <Button size="sm" onClick={() => handleSaveApplicantStatus(applicant)}>
                                                        Save Status
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                                        No applicants match your search.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Recruitment</DialogTitle>
                        <DialogDescription>Open a new job role for applicants.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="jobtitle">Job Title</Label>
                            <Input
                                id="jobtitle"
                                value={recruitmentForm.jobtitle}
                                onChange={(event) => setRecruitmentForm((current) => ({ ...current, jobtitle: event.target.value }))}
                                placeholder="e.g. Senior Frontend Engineer"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="departmentID">Department</Label>
                            <select
                                id="departmentID"
                                value={recruitmentForm.departmentID}
                                onChange={(event) => setRecruitmentForm((current) => ({ ...current, departmentID: event.target.value }))}
                                className="border border-slate-300 rounded-md px-3 py-2 bg-white"
                            >
                                <option value="">No department assigned</option>
                                {departments.map((department) => (
                                    <option key={department._id} value={department._id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={recruitmentForm.description}
                                onChange={(event) => setRecruitmentForm((current) => ({ ...current, description: event.target.value }))}
                                rows={4}
                                className="border border-slate-300 rounded-md px-3 py-2 w-full"
                                placeholder="Describe responsibilities, expectations, and skills required"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateRecruitment}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Recruitment</DialogTitle>
                        <DialogDescription>Update the job title, department, or description.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-jobtitle">Job Title</Label>
                            <Input
                                id="edit-jobtitle"
                                value={recruitmentForm.jobtitle}
                                onChange={(event) => setRecruitmentForm((current) => ({ ...current, jobtitle: event.target.value }))}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-departmentID">Department</Label>
                            <select
                                id="edit-departmentID"
                                value={recruitmentForm.departmentID}
                                onChange={(event) => setRecruitmentForm((current) => ({ ...current, departmentID: event.target.value }))}
                                className="border border-slate-300 rounded-md px-3 py-2 bg-white"
                            >
                                <option value="">No department assigned</option>
                                {departments.map((department) => (
                                    <option key={department._id} value={department._id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <textarea
                                id="edit-description"
                                value={recruitmentForm.description}
                                onChange={(event) => setRecruitmentForm((current) => ({ ...current, description: event.target.value }))}
                                rows={4}
                                className="border border-slate-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateRecruitment}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Recruitment</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{selectedRecruitment?.jobtitle}"? This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteRecruitment}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
