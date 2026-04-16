import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRNotices } from "../../../redux/Thunks/HRNoticeThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { CreateNoticeDialogBox, ViewNoticeDialogBox, EditNoticeDialogBox, DeleteNoticeDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"
import { HandleGetHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"

export const HRIssueNoticesPage = () => {
    const dispatch = useDispatch()
    const HRNoticeState = useSelector((state) => state.HRNoticeReducer)

    useEffect(() => {
        dispatch(HandleGetHRNotices())
        dispatch(HandleGetHRDepartments())
        dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (HRNoticeState.fetchData) {
            dispatch(HandleGetHRNotices())
        }
    }, [HRNoticeState.fetchData, dispatch])

    const handleSuccess = () => {
        dispatch(HandleGetHRNotices())
    }

    if (HRNoticeState.isLoading && !HRNoticeState.departmentNotices.length && !HRNoticeState.employeeNotices.length) {
        return <Loading />
    }

    const allNotices = [...HRNoticeState.departmentNotices, ...HRNoticeState.employeeNotices].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    return (
        <div className="notices-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-3 h-[97%]">
            <div className="notices-heading flex justify-between items-center min-[250px]:flex-col min-[250px]:gap-2 min-[400px]:flex-row">
                <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">Issue Notices</h1>
                <CreateNoticeDialogBox />
            </div>

            <div className="notices-stats flex gap-4 flex-wrap">
                <div className="stat-card bg-blue-100 p-3 rounded-lg">
                    <span className="font-bold text-blue-800">{HRNoticeState.departmentNotices.length}</span>
                    <span className="text-blue-600 ml-2">Department Notices</span>
                </div>
                <div className="stat-card bg-green-100 p-3 rounded-lg">
                    <span className="font-bold text-green-800">{HRNoticeState.employeeNotices.length}</span>
                    <span className="text-green-600 ml-2">Employee Notices</span>
                </div>
                <div className="stat-card bg-purple-100 p-3 rounded-lg">
                    <span className="font-bold text-purple-800">{allNotices.length}</span>
                    <span className="text-purple-600 ml-2">Total Notices</span>
                </div>
            </div>

            <div className="notices-data flex flex-col gap-4 md:pe-5 overflow-auto flex-1">
                {allNotices.length === 0 ? (
                    <div className="wrapper-container p-8 border-2 border-blue-700 rounded-lg w-auto flex-1 flex items-center justify-center min-h-[200px]">
                        <div className="text-center">
                            <p className="text-gray-600 text-lg mb-2">No notices created yet.</p>
                            <p className="text-gray-500 text-sm">Click "Create Notice" to issue your first notice.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {allNotices.map((notice) => (
                            <div key={notice._id} className="notice-card border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors bg-white">
                                <div className="notice-header flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-gray-800">{notice.title}</h3>
                                        <div className="flex gap-2 mt-1 flex-wrap">
                                            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${notice.audience === "Department-Specific" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}>
                                                {notice.audience}
                                            </span>
                                            {notice.audience === "Department-Specific" && notice.department && (
                                                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                                                    {notice.department.name}
                                                </span>
                                            )}
                                            {notice.audience === "Employee-Specific" && notice.employee && (
                                                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                                                    {notice.employee.firstname} {notice.employee.lastname}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <ViewNoticeDialogBox notice={notice} />
                                        <EditNoticeDialogBox notice={notice} onSuccess={handleSuccess} />
                                        <DeleteNoticeDialogBox noticeID={notice._id} onSuccess={handleSuccess} />
                                    </div>
                                </div>
                                <div className="notice-content mb-3">
                                    <p className="text-gray-600 line-clamp-3">{notice.content}</p>
                                </div>
                                <div className="notice-footer flex justify-between items-center text-sm text-gray-500 border-t pt-2">
                                    <span>Created by: {notice.createdby ? `${notice.createdby.firstname} ${notice.createdby.lastname}` : "HR"}</span>
                                    <span>{new Date(notice.createdAt).toLocaleDateString()} at {new Date(notice.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
