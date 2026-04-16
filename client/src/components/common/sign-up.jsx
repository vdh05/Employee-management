import { ErrorPopup } from "./error-popup"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"


export const SignUP = ({ handlesignupform, handlesubmitform, stateformdata, errorpopup }) => {
    const employeestate = useSelector((state) => state.HRReducer)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    return (
        <>
            {employeestate.error.status ? <ErrorPopup error={employeestate.error.message} /> : null}
            {errorpopup ? <ErrorPopup error={"Password does not match, Please try again"} /> : null}
            <div className="HR-form-content justify-center items-center min-[250px]:w-[90%] 2xl:w-[80%] grid grid-cols-1 min-[900px]:grid-cols-2 mx-auto">

                <div className="form-img mx-auto">
                    <img src="../../src/assets/Employee-Welcome.jpg" alt="Your Company" className=" min-[250px]:max-w-[15rem] min-[600px]:max-w-sm min-[900px]:max-w-sm 2xl:max-w-md" />
                </div>

                {/* <div className="form-content flex flex-col gap-6 sm:justify-center min-[250px]:items-center sm:items-center md:items-start md:justify-normal">

                        <div className="form-heading my-3">
                            <h1 className="text-4xl text-purple-700 font-bold">Sign UP HR</h1>
                        </div>

                        <div className="form-content flex gap-8 min-[250px]:flex-col sm:flex-row">

                            <div className="form-section-first min-[250px]:w-[80vw] sm:w-[30vw] md:w-[20vw] flex flex-col gap-5 sm:text-sm lg:text-md xl:text-lg">

                                <div className="form-field">
                                    <label htmlFor="firstname" className="block font-medium text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            required
                                            autoComplete="text"
                                            value={stateformdata.firstname}
                                            onChange={handlesignupform}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="lastname" className="block font-medium text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            required
                                            autoComplete="text"
                                            value={stateformdata.lastname}
                                            onChange={handlesignupform}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="contactnumber" className="block font-medium text-gray-900">
                                        Contact Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="contactnumber"
                                            name="contactnumber"
                                            type="number"
                                            required
                                            autoComplete="number"
                                            onChange={handlesignupform}
                                            value={stateformdata.contactnumber}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section-second sm:w-[30vw] md:w-[20vw] flex flex-col gap-5 sm:text-sm lg:text-md xl:text-lg">

                                <div className="form-field">
                                    <label htmlFor="email" className="block font-medium text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={stateformdata.email}
                                            onChange={handlesignupform}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="textpassword" className="block font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="textpassword"
                                            name="textpassword"
                                            type="text"
                                            required
                                            autoComplete="text"
                                            value={stateformdata.textpassword}
                                            onChange={handlesignupform}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="password" className="block font-medium text-gray-900">
                                        Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="password"
                                            value={stateformdata.password}
                                            onChange={handlesignupform}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="sign-up-button flex justify-between items-end min-[250px]:w-[80vw] sm:w-[65vw] md:w-[42vw] 3xl:w-[41.5vw]">
                            <Button className="min-[250px]:text-xs min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 sm:text-sm md:text-md  px-4 py-2 bg-purple-700 border-2 border-purple-700 text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 hover:cursor-pointer" onClick={handlesubmitform}>Sign Up</Button>

                            <div className="sign-in-button flex justify-center items-center gap-2">
                                <h1 className="text-blue-600 font-bold min-[250px]:text-right min-[250px]:text-xs sm:text-sm md:text-md">
                                    Already Have An Account?
                                </h1>
                                <Link to={"/auth/HR/login"}>
                                    <Button className="min-[250px]:text-xs min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 sm:text-sm md:text-md px-4 py-2 bg-purple-700 border-2 border-purple-700 text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 hover:cursor-pointer">Sign In</Button>
                                </Link>
                            </div>
                        </div>
                    </div> */}

                
                
                <div className="form-button-group w-full grid grid-cols-1 gap-5">

                    <div className="form-container grid min-[250px]:grid-cols-1 sm:grid-cols-2 w-full min-[250px]:gap-3 sm:gap-10 justify-center items-center">

                        <div className="form-group-1 w-full flex flex-col gap-3">
                            <div className="label-field-pair flex flex-col ">
                                <label htmlFor="firstname">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.firstname}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="lastname">
                                    last Name
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    autoComplete="lastname"
                                    value={stateformdata.lastname}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={stateformdata.email}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="textpassword">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="textpassword"
                                        name="textpassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        autoComplete="textpassword"
                                        value={stateformdata.textpassword}
                                        onChange={handlesignupform}
                                        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2 pr-10" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="password">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        autoComplete="password"
                                        value={stateformdata.password}
                                        onChange={handlesignupform}
                                        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2 pr-10" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-group-2 w-full flex flex-col gap-3">
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="contactnumber">
                                    Contact Number
                                </label>
                                <div className="flex w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:text-sm/6">
                                    <span className="flex items-center px-3 bg-gray-100 border-r border-gray-300 text-gray-600 rounded-l-md">+91</span>
                                    <input
                                        id="contactnumber"
                                        name="contactnumber"
                                        type="number"
                                        required
                                        autoComplete="text"
                                        placeholder="Phone Number"
                                        value={stateformdata.contactnumber}
                                        onChange={handlesignupform}
                                        className="flex-1 border-0 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 rounded-r-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                </div>
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="name">
                                    Organization Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.name}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="description">
                                    Organization Description
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.description}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="OrganizationURL">
                                    Organization URL
                                </label>
                                <input
                                    id="OrganizationURL"
                                    name="OrganizationURL"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.OrganizationURL}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>
                            <div className="label-field-pair flex flex-col">
                                <label htmlFor="OrganizationMail">
                                    Organization Mail
                                </label>
                                <input
                                    id="OrganizationMail"
                                    name="OrganizationMail"
                                    type="text"
                                    required
                                    autoComplete="text"
                                    value={stateformdata.OrganizationMail}
                                    onChange={handlesignupform}
                                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2" />
                            </div>

                        </div>
                    </div>

                    <div className="buttons w-full flex justify-between">
                        <Button className="min-[250px]:text-xs min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 sm:text-sm md:text-md  px-4 py-2 bg-purple-700 border-2 border-purple-700 text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 hover:cursor-pointer" onClick={handlesubmitform}>Sign Up</Button>
                        <div className="sing-in flex justify-center items-center gap-2">
                            <p className="min-[250px]:text-xs sm:text-sm">Already Have an Account?</p>
                            <Link to={"/auth/HR/login"}>
                                <Button className="min-[250px]:text-xs min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 sm:text-sm md:text-md px-4 py-2 bg-purple-700 border-2 border-purple-700 text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 hover:cursor-pointer">Sign In</Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}