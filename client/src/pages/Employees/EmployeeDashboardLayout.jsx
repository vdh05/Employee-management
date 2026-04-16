import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "../../components/ui/EmployeeSidebar.jsx";
import { HandleGetEmployees, HandlePostEmployeeLogout } from "../../redux/Thunks/EmployeeThunk.js";
import { Loading } from "../../components/common/loading.jsx";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const EmployeeDashboardLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employeeState = useSelector((state) => state.employeereducer);

    useEffect(() => {
        dispatch(HandleGetEmployees({ apiroute: "GET_PROFILE" }));
    }, [dispatch]);

    const handleLogout = async () => {
        await dispatch(HandlePostEmployeeLogout());
        navigate("/");
    };

    if (employeeState.isLoading && !employeeState.data?.data) {
        return <Loading />;
    }

    if (employeeState.error.status && !employeeState.data?.data) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
                    <p className="text-gray-600">{employeeState.error.message || "Unable to load your dashboard."}</p>
                </div>
            </div>
        );
    }

    const employee = employeeState.data?.data;
    const fullName = employee ? `${employee.firstname} ${employee.lastname}` : "Employee";

    return (
        <div className="employee-dashboard-container flex">
            <div className="HRDashboard-sidebar">
                <SidebarProvider>
                    <EmployeeSidebar />
                    <div className="sidebar-container min-[250px]:absolute md:relative">
                        <SidebarTrigger />
                    </div>
                </SidebarProvider>
            </div>
            <div className="HRdashboard-container h-screen w-full min-[250px]:mx-1 md:mx-2 flex flex-col overflow-auto gap-4 py-4">
                <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white shadow-lg">
                    <div className="flex justify-between items-center gap-4 min-[250px]:flex-col md:flex-row p-5">
                        <div>
                            <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Employee Dashboard</p>
                            <h1 className="min-[250px]:text-xl xl:text-4xl font-bold mt-2">Hello, {fullName}</h1>
                            <p className="text-slate-200 mt-2 max-w-2xl">
                                View your salary, attendance, leaves, notices, and corporate calendar in one streamlined workspace.
                            </p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2 border-white/30 bg-white text-slate-900 hover:bg-slate-100"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </Card>
                <Outlet />
            </div>
        </div>
    );
};
