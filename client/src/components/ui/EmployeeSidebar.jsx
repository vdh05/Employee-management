import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { Calendar, FileText } from "lucide-react";

const base = "/auth/employee/employee-dashboard-index";

export function EmployeeSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3 p-2">
                            <NavLink
                                to={base}
                                end
                                className={({ isActive }) => (isActive ? "bg-blue-200 rounded-lg" : "")}
                            >
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/dashboard.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">Dashboard</span>
                                </SidebarMenuItem>
                            </NavLink>
                            <NavLink
                                to={`${base}/salaries`}
                                className={({ isActive }) => (isActive ? "bg-blue-200 rounded-lg" : "")}
                            >
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg my-1">
                                    <img src="/../../src/assets/HR-Dashboard/Salary.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">My Salaries</span>
                                </SidebarMenuItem>
                            </NavLink>
                            <NavLink
                                to={`${base}/leaves`}
                                className={({ isActive }) => (isActive ? "bg-blue-200 rounded-lg" : "")}
                            >
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg my-1">
                                    <img src="/../../src/assets/HR-Dashboard/leave.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">My Leaves</span>
                                </SidebarMenuItem>
                            </NavLink>
                            <NavLink
                                to={`${base}/attendance`}
                                className={({ isActive }) => (isActive ? "bg-blue-200 rounded-lg" : "")}
                            >
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg my-1">
                                    <img src="/../../src/assets/HR-Dashboard/attendance.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">My Attendance</span>
                                </SidebarMenuItem>
                            </NavLink>
                            <NavLink
                                to={`${base}/notices`}
                                className={({ isActive }) => (isActive ? "bg-blue-200 rounded-lg" : "")}
                            >
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg my-1">
                                    <FileText className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">My Notices</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink
                                to={`${base}/calendar`}
                                className={({ isActive }) => (isActive ? "bg-blue-200 rounded-lg" : "")}
                            >
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg my-1">
                                    <Calendar className="w-7 ms-2 my-1 h-7" />
                                    <span className="text-[16px]">Corporate Calendar</span>
                                </SidebarMenuItem>
                            </NavLink>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
