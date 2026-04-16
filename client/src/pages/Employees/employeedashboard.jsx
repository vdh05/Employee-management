import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { EmployeedashboardSidebar } from "../../components/ui/EmployeSidebars.jsx"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

export const EmployeeDashboard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const pathArray = location.pathname.split("/")

    useEffect(() => {
        // Only redirect if we're at the root employee-dashboard path
        if (pathArray.length === 3 && pathArray[2] === "employee-dashboard-index") {
            navigate(`/auth/employee/employee-dashboard-index`, { replace: true })
        }
    }, [location.pathname, navigate])

    return (
        <div className="Employee-dashboard-container flex h-svh overflow-hidden">
            <div className="EmployeeDashboard-sidebar">
                <SidebarProvider>
                    <EmployeedashboardSidebar />
                    <div className="sidebar-container min-[250px]:absolute md:relative">
                        <SidebarTrigger />
                    </div>
                </SidebarProvider>
            </div>
            <div className="Employeedashboard-container h-svh min-h-0 w-full min-[250px]:mx-1 md:mx-2 flex flex-col overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default EmployeeDashboard;
