import { createBrowserRouter } from "react-router-dom";
import { EmployeeRoutes } from "./employeeroutes.jsx"
import { HRRoutes } from "./HRroutes.jsx";
import NotFound from "../components/common/NotFound"; // Create this component if it doesn't exist
import HRSignupPage from "../pages/HumanResources/HRSignup";
import HRDashbaord from "../pages/HumanResources/HRdashbaord"; // Make sure this import matches the filename

export const router = createBrowserRouter([
    ...EmployeeRoutes,
    ...HRRoutes ,
    {
        path: "/auth/HR/signup",
        element: <HRSignupPage />
    },
    {
        path: "/auth/HR/dashboard",
        element: <HRDashbaord />
    },
    {
        path: "/HR/dashboard/*", // <-- Add this route for dashboard-data and nested dashboard routes
        element: <HRDashbaord />
    },
    {
        path: "*",
        element: <NotFound />
    }
],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionStatusRevalidation: true,
            v7_startTransition: true,
            v7_skipActionErrorRevalidation: true,
        }
    }
)