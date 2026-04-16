import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"
import { Home, Users, Briefcase, DollarSign, Calendar, Bell, FileText, Clock } from "lucide-react"

export function EmployeedashboardSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3 p-2">
                            <NavLink to={"/auth/employee/employee-dashboard-index"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <Home className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">Dashboard</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/auth/employee/employee-dashboard-index/salaries"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <DollarSign className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">My Salary</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/auth/employee/employee-dashboard-index/leaves"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <Calendar className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">My Leaves</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/auth/employee/employee-dashboard-index/attendance"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <Clock className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">Attendance</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/auth/employee/employee-dashboard-index/notices"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <Bell className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">Notices</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/auth/employee/employee-dashboard-index/calendar"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <Calendar className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">Calendar</span>
                                </SidebarMenuItem>
                            </NavLink>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}