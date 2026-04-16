import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { HandleGetEmployees } from "../redux/Thunks/EmployeeThunk"
import { Loading } from "../components/common/loading.jsx"

export const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.employeereducer)
    const dispatch = useDispatch()
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
    const didCheckRef = useRef(false)

    useEffect(() => {
        // Only run check once on mount (e.g. page refresh). Skip if already authenticated (e.g. just logged in).
        if (didCheckRef.current) return
        didCheckRef.current = true
        dispatch(HandleGetEmployees({ apiroute: "CHECKELOGIN" }))
        setHasCheckedAuth(true)
    }, [dispatch])

    // If already authenticated (e.g. just came from login), show dashboard immediately
    if (isAuthenticated) {
        return <>{children}</>
    }

    // Show loading only while we're still checking (first load / refresh) and not yet authenticated
    if (!hasCheckedAuth || isLoading) {
        return <Loading />
    }
    
    return <Navigate to="/" />
}
