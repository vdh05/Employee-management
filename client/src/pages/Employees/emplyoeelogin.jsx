import { useState, useEffect, useRef } from "react"
import { SignIn } from "../../components/common/sign-in.jsx"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostEmployees, HandleGetEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { CommonStateHandler } from "../../utils/commonhandler.js"


export const EmployeeLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const EmployeeState = useSelector((state) => state.employeereducer)
    const [signinform, set_signinform] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)

    const handlesigninform = (event) => {
        CommonStateHandler(signinform, set_signinform, event)
    }

    const handlesigninsubmit = async (e) => {
        e.preventDefault();
        loadingbar.current.continuousStart();
        dispatch(HandlePostEmployees({ apiroute: "LOGIN", data: signinform }))
    }


    const RedirectToDashbaord = () => {
        loadingbar.current.complete()
        navigate("/auth/employee/employee-dashboard-index")
    }

    if (EmployeeState.error.status) {
        loadingbar.current.complete()
    }

    useEffect(() => {
        if (EmployeeState.isAuthenticated) {
            RedirectToDashbaord()
        }
    }, [EmployeeState.isAuthenticated])

    return (
        <div className="employee-login-container">
            <LoadingBar ref={loadingbar} />
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <SignIn image={"../../src/assets/Employee-Welcome.jpg"} handlesigninform={handlesigninform} handlesigninsubmit={handlesigninsubmit} targetedstate={EmployeeState} statevalue={signinform} redirectpath={"/auth/employee/forgot-password"} showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>
        </div>
    )
}