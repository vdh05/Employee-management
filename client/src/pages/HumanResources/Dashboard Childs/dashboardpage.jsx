import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
import { NotificationBell } from "../../../components/common/NotificationBell.jsx"
import { useEffect } from "react"
import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../../components/common/loading.jsx"
export const HRDashboardPage = () => {
    console.log("Reloaded")
    const DashboardState = useSelector((state) => state.dashboardreducer)
    const dispatch = useDispatch()
    const DataArray = [
        {
            image: "/assets/HR-Dashboard/employee-2.png",
            dataname: "employees",
            path: "/HR/dashboard/employees"
        },
        {
            image: "/assets/HR-Dashboard/department.png",
            dataname: "departments",
            path: "/HR/dashboard/departments",
        },
        {
            image: "/assets/HR-Dashboard/leave.png",
            dataname: "leaves",
            path: "/HR/dashboard/leaves"
        },
        {
            image: "/assets/HR-Dashboard/request.png",
            dataname: "requestes",
            path: "/HR/dashboard/requestes"
        }
    ]

    useEffect(() => {
        dispatch(HandleGetDashboard({ apiroute: "GETDATA" }))
    },[])

    if (DashboardState.isLoading) { 
        return (
            <Loading />
        )
    }


    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Dashboard</h1>
                <NotificationBell />
            </div>
            <KeyDetailBoxContentWrapper imagedataarray={DataArray} data={DashboardState.data} />
            <div className="salary-notices-container h-3/4 grid min-[250px]:grid-cols-1 lg:grid-cols-2 min-[250px]:gap-3 xl:gap-3">
                <SalaryChart balancedata={DashboardState.data} />
                <DataTable noticedata={DashboardState.data} />
            </div>
        </>
    )
}

