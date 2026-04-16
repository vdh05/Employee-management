import { EmployeeDetailsDialogBox } from "./dialogboxes.jsx"
import { DeleteEmployeeDialogBox } from "./dialogboxes.jsx"
import { RemoveEmployeeFromDepartmentDialogBox } from "./dialogboxes.jsx"
import { DeleteSalaryDialogBox } from "./dialogboxes.jsx"
import { DeleteAttendanceDialogBox } from "./dialogboxes.jsx"
import { EmployeeEditLeaveDialogBox, EmployeeDeleteLeaveDialogBox } from "./dialogboxes.jsx"

export const ListWrapper = ({ children }) => {
    return (
        <div className={`wrapper-container p-2 border-2 border-blue-700 rounded-lg w-auto`}>
            {children}
        </div>
    )
}

export const HeadingBar = ({ table_layout, table_headings }) => {
    return (
        <div className={`heading-container grid min-[250px]:grid-cols-2 sm:${table_layout ? table_layout : `grid-cols-5`} rounded-lg gap-4 overflow-auto`}>
            {
                table_headings.map((item) => <div className={`heading-content text-white bg-blue-800 font-bold min-[250px]:text-xs xl:text-xl min-[250px]:p-1 sm:p-2 rounded-lg text-center flex justify-center items-center 
                ${(["Email", "Department", "Contact Number"].includes(item)) ? `min-[250px]:hidden sm:flex` : ""}`}>
                    {item}
                </div>)
            }
        </div>
    )
}

export const ListContainer = ({ children }) => {
    return (
        <div className={`list-item-container px-2 py-2 border-2 border-blue-700 rounded-lg w-auto`}>
            {children}
        </div>
    )
}

export const ListItems = ({ TargetedState }) => {
    return (
        <>
            {TargetedState.data ? TargetedState.data.map((item) => <div className={`list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-5 py-1 gap-2 justify-center items-center border-b-2 border-blue-800`}>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                    {`${item.firstname} ${item.lastname}`}
                </div>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                    {item.email}
                </div>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                    {item.department ? item.department.name : "Not Specified"}
                </div>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm  xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                    {item.contactnumber}
                </div>
                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                    {/* <button className="btn-sm btn-blue-700 text-md border-2 border-blue-800 px-2 py-1 rounded-md hover:bg-blue-800 hover:text-white">View</button> */}
                    <EmployeeDetailsDialogBox EmployeeID={item._id} />
                    <DeleteEmployeeDialogBox EmployeeID={item._id} />
                </div>
            </div>) : null}
        </>
    )
}


export const DepartmentListItems = ({ TargetedState }) => {
    console.log("this is targeted state", TargetedState)
    return (
        <>
            {TargetedState ? TargetedState.employees.map((item) => <div className={`list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-4 py-1 gap-2 justify-center items-center border-b-2 border-blue-800`}>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis">
                    {`${item.firstname} ${item.lastname}`}
                </div>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                    {item.email}
                </div>
                <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm  xl:text-lg p-2 rounded-lg text-center overflow-hidden text-ellipsis min-[250px]:hidden sm:block">
                    {item.contactnumber}
                </div>
                <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center min-[250px]:gap-1 xl:gap-2">
                    <RemoveEmployeeFromDepartmentDialogBox DepartmentName={TargetedState.name} DepartmentID={TargetedState._id} EmployeeID={item._id}/>
                </div>
            </div>) : null}
        </>
    )
}

export const SalaryListItems = ({ TargetedState }) => {
    if (!TargetedState?.data?.length) return null
    return (
        <>
            {TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-6 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                        {item.basicpay} {item.currency}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                        {item.netpay} {item.currency}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        {item.duedate ? new Date(item.duedate).toLocaleDateString() : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        <span className={item.status === "Paid" ? "text-green-700" : item.status === "Delayed" ? "text-yellow-700" : "text-gray-700"}>{item.status}</span>
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center gap-1">
                        <DeleteSalaryDialogBox SalaryID={item._id} />
                    </div>
                </div>
            ))}
        </>
    )
}

export const LeaveListItems = ({ TargetedState, onApprove, onReject }) => {
    if (!TargetedState?.data?.length) return null
    return (
        <>
            {TargetedState.data.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-7 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                        {item.title || "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        {item.startdate ? new Date(item.startdate).toLocaleDateString() : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        {item.enddate ? new Date(item.enddate).toLocaleDateString() : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis min-[250px]:hidden sm:block max-w-[120px]">
                        {item.reason || "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        <span className={item.status === "Approved" ? "text-green-700" : item.status === "Rejected" ? "text-red-700" : "text-yellow-700"}>{item.status}</span>
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center gap-1 flex-wrap">
                        {item.status === "Pending" && (
                            <>
                                <button type="button" className="btn-sm border-2 border-green-700 px-2 py-0.5 rounded-md hover:bg-green-700 hover:text-white text-green-700 text-sm" onClick={() => onApprove(item._id)}>Approve</button>
                                <button type="button" className="btn-sm border-2 border-red-700 px-2 py-0.5 rounded-md hover:bg-red-700 hover:text-white text-red-700 text-sm" onClick={() => onReject(item._id)}>Reject</button>
                            </>
                        )}
                        {item.status !== "Pending" && "—"}
                    </div>
                </div>
            ))}
        </>
    )
}

export const AttendanceListItems = ({ TargetedState }) => {
    if (!TargetedState?.data?.length) return null
    return (
        <>
            {TargetedState.data.map((item) => {
                const sortedLogs = Array.isArray(item.attendancelog)
                    ? [...item.attendancelog].sort((a, b) => new Date(b.logdate) - new Date(a.logdate))
                    : []

                const rows = sortedLogs.length > 0 ? sortedLogs : [null]

                return rows.map((logEntry, index) => {
                    const status = logEntry?.logstatus || item.status || "Not Specified"
                    const displayDate = logEntry?.logdate
                        ? new Date(logEntry.logdate).toLocaleDateString()
                        : (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—")

                    return (
                        <div key={`${item._id}-${index}`} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-6 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                                {item.employee ? `${item.employee.firstname} ${item.employee.lastname}` : "—"}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                {item.employee?.department?.name || "—"}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                {displayDate}
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                                <span className={status === "Present" ? "text-green-700" : status === "Absent" ? "text-red-700" : status === "Pending" ? "text-yellow-700" : "text-gray-700"}>{status}</span>
                            </div>
                            <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                                {logEntry?.logreason || "—"}
                            </div>
                            <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center gap-1">
                                <DeleteAttendanceDialogBox AttendanceID={item._id} />
                            </div>
                        </div>
                    )
                })
            })}
        </>
    )
}

export const EmployeeSalaryListItems = ({ list }) => {
    if (!list?.length) return null
    return (
        <>
            {list.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-4 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        {item.basicpay} {item.currency}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                        {item.netpay} {item.currency}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        {item.duedate ? new Date(item.duedate).toLocaleDateString() : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        <span className={item.status === "Paid" ? "text-green-700" : item.status === "Delayed" ? "text-yellow-700" : "text-gray-700"}>{item.status}</span>
                    </div>
                </div>
            ))}
        </>
    )
}

export const EmployeeLeaveListItems = ({ list }) => {
    if (!list?.length) return null
    return (
        <>
            {list.map((item) => (
                <div key={item._id} className="list-item-container grid min-[250px]:grid-cols-2 sm:grid-cols-6 py-1 gap-2 justify-center items-center border-b-2 border-blue-800">
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis">
                        {item.title || "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        {item.startdate ? new Date(item.startdate).toLocaleDateString() : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center min-[250px]:hidden sm:block">
                        {item.enddate ? new Date(item.enddate).toLocaleDateString() : "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-start overflow-hidden text-ellipsis min-[250px]:hidden sm:block max-w-[120px]">
                        {item.reason || "—"}
                    </div>
                    <div className="heading-content font-bold min-[250px]:text-sm sm:text-xs lg:text-sm xl:text-lg p-2 rounded-lg text-center">
                        <span className={item.status === "Approved" ? "text-green-700" : item.status === "Rejected" ? "text-red-700" : "text-yellow-700"}>{item.status}</span>
                    </div>
                    <div className="heading-content text-blue-800 font-bold min-[250px]:text-xs xl:text-lg p-2 rounded-lg text-center flex justify-center items-center gap-1 flex-wrap">
                        {item.status === "Pending" && (
                            <>
                                <EmployeeEditLeaveDialogBox leave={item} />
                                <EmployeeDeleteLeaveDialogBox leaveID={item._id} />
                            </>
                        )}
                        {item.status !== "Pending" && "—"}
                    </div>
                </div>
            ))}
        </>
    )
}