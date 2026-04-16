import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { ProtectedRoutes } from "./protectedroutes.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { EntryPage } from "../pages/Employees/EntryPage.jsx"
import EmployeeDashboardIndex from "../pages/Employees/EmployeeDashboardIndex.jsx"
import { MySalariesPage } from "../pages/Employees/MySalariesPage.jsx"
import { MyLeavesPage } from "../pages/Employees/MyLeavesPage.jsx"
import { MyAttendancePage } from "../pages/Employees/MyAttendancePage.jsx"
import { EmployeeNoticesPage } from "../pages/Employees/EmployeeNoticesPage.jsx"
import { EmployeeCorporateCalendarPage } from "../pages/Employees/CorporateCalendarPage.jsx"

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EntryPage />
    },
    {
        path: "/auth/employee/login",
        element: <EmployeeLogin />
    },
    {
        path: "/auth/employee/employee-dashboard-index",
        element: <ProtectedRoutes> <EmployeeDashboard /> </ProtectedRoutes>,
        children: [
            {
                path: "/auth/employee/employee-dashboard-index",
                element: <EmployeeDashboardIndex />
            },
            {
                path: "/auth/employee/employee-dashboard-index/salaries",
                element: <MySalariesPage />
            },
            {
                path: "/auth/employee/employee-dashboard-index/leaves",
                element: <MyLeavesPage />
            },
            {
                path: "/auth/employee/employee-dashboard-index/attendance",
                element: <MyAttendancePage />
            },
            {
                path: "/auth/employee/employee-dashboard-index/notices",
                element: <EmployeeNoticesPage />
            },
            {
                path: "/auth/employee/employee-dashboard-index/calendar",
                element: <EmployeeCorporateCalendarPage />
            }
        ]
    },
    {
        path: "/auth/employee/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/auth/employee/reset-email-confirmation",
        element: <ResetEmailConfirm />
    },
    {
        path: "/auth/employee/resetpassword/:token",
        element: <ResetPassword /> 
    },
]
