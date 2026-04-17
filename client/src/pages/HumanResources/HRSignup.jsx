import { SignUP } from "../../components/common/sign-up"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { HandlePostEmployees, HandleGetEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { HandlePostHumanResources, HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRSignupPage = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const [errorpopup, seterrorpopup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [signupform, set_signuform] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactnumber: "",
        password: "",
        textpassword: "",
        name : "", 
        description : "", 
        OrganizationURL : "", 
        OrganizationMail : ""
    })
    const [signupSubmitted, setSignupSubmitted] = useState(false);

    const handlesignupform = (event) => {
        CommonStateHandler(signupform, set_signuform, event)
    }

    const handlesubmitform = (event) => {
        event.preventDefault();
        const formData = {
            ...signupform,
            contactnumber: signupform.contactnumber ? `+91${signupform.contactnumber}` : ""
        };
        const requiredFields = [
            'firstname', 'lastname', 'email', 'contactnumber', 'password', 'textpassword',
            'name', 'description', 'OrganizationURL', 'OrganizationMail'
        ];
        const missing = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
        if (missing.length > 0) {
            seterrorpopup(true);
            alert("Please fill all fields: " + missing.join(", "));
            return;
        }
        if (formData.textpassword === formData.password) {
            seterrorpopup(false)
            if (loadingbar.current) {
                loadingbar.current.continuousStart();
            }
            setSignupSubmitted(true);
            console.log("Signup form data:", formData);
            dispatch(HandlePostHumanResources({ apiroute: "SIGNUP", data: formData }))
        }
        else {
            seterrorpopup(true)
            alert("Passwords do not match.");
        }
    }

    useEffect(() => {
        if (HRState.error.status) {
            if (loadingbar.current) {
                loadingbar.current.complete()
            }
        }
    }, [HRState.error.status]);

    useEffect(() => {
        if (!signupSubmitted) return;
        if (HRState.isAuthenticated && HRState.isVerified) {
            if (loadingbar.current) {
                loadingbar.current.complete()
            }
            navigate("/HR/dashboard")
        } else if (HRState.isAuthenticated && !HRState.isVerified) {
            if (loadingbar.current) {
                loadingbar.current.complete()
            }
            navigate("/auth/HR/verify-email")
        }
    }, [HRState.isAuthenticated, HRState.isVerified, signupSubmitted])

    // console.log(signupform)
    // console.log(HRState)

    return (
        <div className="HRsignup-page-container h-screen flex justify-center min-[900px]:justify-center min-[900px]:items-center">
            <LoadingBar ref={loadingbar} />
            <SignUP stateformdata={signupform} handlesignupform={handlesignupform} handlesubmitform={handlesubmitform} errorpopup={errorpopup} />
        </div>
    )
}

export default HRSignupPage;
