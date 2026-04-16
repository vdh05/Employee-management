import { Link } from "react-router-dom"
import { ErrorPopup } from "./error-popup"
import { useSelector } from "react-redux"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
export const Reset_Password = ({ handlepasswordsubmit, handlepasswordform, passworderror, targetstate, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => { 
    return (
        <>
            {targetstate.error.status ? <ErrorPopup error={targetstate.error.message} /> : null}
            {passworderror ? <ErrorPopup error={"Password Does Not Match, Please Try Again"} /> : null}
            <div className="flex min-h-full flex-1 min-[200px]:flex-col md:flex-row md:items-center justify-center px-6 py-12 lg:px-8 md:gap-5">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:mx-10">
                    <img
                        alt="Your Company" src="../../src/assets/resetpassword.png"
                        className="mx-auto h-auto w-auto"
                    />
                    <img src="../../src/assets/welcome.png" alt="" />
                </div>
                <div className="my-5 sm:mx-auto sm:w-full sm:max-w-sm lg:mx-10">
                    <h2 className="mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Enter Your New Password
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    id="text"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    onChange={handlepasswordform}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Repeat Password
                                </label>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="repeatpassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    onChange={handlepasswordform}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-2 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handlepasswordsubmit}>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
