import { Verify_Email_Component } from "../../components/common/verify-email.jsx"
import { useState, useEffect, useRef } from "react"
// import { SignIn } from "../../components/common/sign-in.jsx"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostHumanResources, HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { CommonStateHandler } from "../../utils/commonhandler.js"

export const VerifyEmailPage = () => {
    const HRState = useSelector((state) => state.HRReducer)
    // const [errorpopup, seterrorpopup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get("email") || ""
    const loadingbar = useRef(null)
    const [verificationcode, setverificationcode] = useState("")

    const handleCodeValue = (value) => {
        setverificationcode(value)

    }

    const handleOTPsubmit = () => {
        loadingbar.current.continuousStart();
        dispatch(HandlePostHumanResources({ apiroute: "VERIFY_EMAIL", data: { verificationcode: verificationcode, email } }))
    }

    useEffect(() => {
        if (email && !HRState.isVerified) {
            dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL", email }))
        }

        if ((!HRState.isVerified) && (!HRState.isVerifiedEmailAvailable) && (HRState.error.content)) {
            navigate("/auth/HR/reset-email-validation")
        }

        if (HRState.isVerified) {
            loadingbar.current.complete()
            navigate("/auth/HR/dashboard") 
        }
    }, [email, HRState.isVerified, HRState.isVerifiedEmailAvailable, HRState.error.content])

    // console.log(HRState)
    // console.log(HRState.isVerified)
    // console.log(checkHREmail) 

    return (
        <>
            <LoadingBar ref={loadingbar} />
            <Verify_Email_Component handleCodeValue={handleCodeValue} value={verificationcode} handleOTPsubmit={handleOTPsubmit} />
        </>
    )
}
