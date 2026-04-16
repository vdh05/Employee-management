import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ErrorPopup } from "../error-popup.jsx"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { useDispatch, useSelector } from "react-redux"
import { FormSubmitToast } from "./Toasts.jsx"
import { Loading } from "../loading.jsx"
import { HandleDeleteHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { HandlePostHRDepartments, HandlePatchHRDepartments, HandleDeleteHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"

// Top-level export for EmployeeDeleteLeaveDialogBox
export const EmployeeDeleteLeaveDialogBox = ({ leaveID }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const handleDelete = async () => {
        const result = await dispatch(HandleDeleteLeave(leaveID))
        if (!result.error) {
            toast({ title: "Leave deleted", description: "Your leave request was deleted successfully." })
        }
    }
    return (
        <div className="delete-leave-dialog-container">
            <Dialog>
                <DialogTrigger className="btn-sm border-2 border-red-700 px-2 py-0.5 rounded-md hover:bg-red-700 hover:text-white text-red-700 text-sm">Delete</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this leave request?</p>
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button className="bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={handleDelete}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import { HandleCreateSalary, HandleDeleteSalary } from "../../../redux/Thunks/HRSalaryThunk.js"
import { HandleDeleteAttendance } from "../../../redux/Thunks/HRAttendanceThunk.js"
import { HandleCreateLeave, HandleEmployeeUpdateLeave, HandleDeleteLeave, HandleGetMyLeaves } from "../../../redux/Thunks/EmployeeMyDataThunk.js"
import { useToast } from "../../../hooks/use-toast.js"
import { HandleCreateHRNotice, HandleUpdateHRNotice, HandleDeleteHRNotice } from "../../../redux/Thunks/HRNoticeThunk.js"
import { Eye, EyeOff } from "lucide-react"


export const AddEmployeesDialogBox = () => {
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const [formdata, setformdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactnumber: "",
        textpassword: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    return (
        <div className="AddEmployees-content">
            <Dialog>
                <DialogTrigger className="bg-blue-800 border-2 border-blue-800 md:px-4 md:py-2 md:text-lg min-[250px]:px-2 min-[250px]:py-1 min-[250px]:text-sm text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">Add Employees</DialogTrigger>
                <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                    <div className="add-employees-container flex flex-col gap-5">
                        <div className="heading">
                            <h1 className="font-bold text-2xl">Add Employee Info</h1>
                        </div>
                        <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="firstname" className="md:text-md lg:text-lg font-bold">First Name</label>
                                    <input type="text"
                                        id="firstname"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="firstname"
                                        value={formdata.firstname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="lastname" className="md:text-md lg:text-lg font-bold">Last Name</label>
                                    <input type="text"
                                        id="lastanme"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="lastname"
                                        value={formdata.lastname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="email" className="md:text-md lg:text-lg font-bold">Email</label>
                                    <input type="email"
                                        id="email" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="email"
                                        value={formdata.email}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="contactnumber" className="md:text-md lg:text-lg font-bold">Contact Number</label>
                                    <div className="flex border-2 border-gray-700 rounded overflow-hidden focus-within:ring-2 focus-within:ring-blue-800">
                                        <span className="flex items-center px-2 bg-gray-100 border-r border-gray-700 text-gray-700">+91</span>
                                        <input type="number"
                                            id="contactnumber" className="flex-1 px-2 py-1 border-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            name="contactnumber"
                                            placeholder="Phone Number"
                                            value={formdata.contactnumber}
                                            onChange={handleformchange} />
                                    </div>
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="text-password" className="md:text-md lg:text-lg font-bold">Password</label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"}
                                            id="text-password" className="border-2 border-gray-700 rounded px-2 py-1 pr-10 w-full"
                                            name="textpassword"
                                            value={formdata.textpassword}
                                            onChange={handleformchange} />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="password" className="md:text-md lg:text-lg font-bold">Confirm Password</label>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"}
                                            id="password" required={true} className="border-2 border-gray-700 rounded px-2 py-1 pr-10 w-full"
                                            name="password"
                                            value={formdata.password}
                                            onChange={handleformchange} />
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
                        </div>
                        <div className="add-button flex items-center justify-center">
                            <FormSubmitToast formdata={formdata} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const EmployeeDetailsDialogBox = ({ EmployeeID }) => {
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const FetchEmployeeData = (EmID) => {
        const employee = HREmployeesState.data.find((item) => item._id === EmID)
        return employee
    }
    const employeeData = FetchEmployeeData(EmployeeID)
    return (
        <div className="Employees-Details-container">
            <Dialog>
                <div>
                    <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">View</DialogTrigger>
                </div>
                <DialogContent className="max-w-[315px] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                    <div className="employee-data-container flex flex-col gap-4">
                        <div className="employee-profile-logo flex items-center gap-3">
                            <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                                <p className="font-bold text-2xl text-blue-700 p-2">{`${employeeData.firstname.slice(0, 1).toUpperCase()} ${employeeData.lastname.slice(0, 1).toUpperCase()}`}</p>
                            </div>
                            <div className="employee-fullname">
                                <p className="font-bold text-2xl">{`${employeeData.firstname} ${employeeData.lastname}`}</p>
                            </div>
                        </div>
                        <div className="employees-all-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                            <div className="details-group-1 flex flex-col gap-3">
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">First Name :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.firstname}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Last Name :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.lastname}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Email :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.email}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Contact Number :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.contactnumber}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Department :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.department ? employeeData.department.name : "Not Specified"}</p>
                                </div>
                            </div>
                            <div className="details-group-1 flex flex-col gap-3">
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Notices :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.notice.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Salary Records :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.salary.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Leave Requests :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.leaverequest.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Requests :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.generaterequest.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Email Verify :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.isverified ? "Verified" : "Not Verified"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export const DeleteEmployeeDialogBox = ({ EmployeeID }) => {
    const dispatch = useDispatch()
    const DeleteEmployee = (EMID) => {
        dispatch(HandleDeleteHREmployees({ apiroute: `DELETE.${EMID}` }))
    }
    return (
        <div className="delete-employee-dialog-container">
            <Dialog>
                <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">Delete</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this employee?</p>
                        <div className="delete-employee-button-group flex gap-2">
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => DeleteEmployee(EmployeeID)}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}



export const CreateDepartmentDialogBox = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        name: "",
        description: ""
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateDepartment = () => {
        dispatch(HandlePostHRDepartments({ apiroute: "CREATE", data: formdata }))
        setformdata({
            name: "",
            description: ""
        })
    }

    const ShowToast = () => {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `All Fields are required to create a department`,
        })
    }

    return (
        <Dialog>
            <DialogTrigger className="min-[250px]:text-sm sm:text-lg min-[250px]:px-2 min-[250px]:py-1 sm:px-4 sm:py-2 bg-blue-700 font-bold text-white rounded-lg border-2 border-blue-700 hover:bg-white hover:text-blue-700">Create Department</DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="create-department-container flex flex-col gap-4">
                    <div className="create-department-heading">
                        <h1 className="font-bold text-2xl">Create Department</h1>
                    </div>
                    <div className="create-department-form flex flex-col gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="departmentname" className="md:text-md lg:text-lg font-bold">Department Name</label>
                                <input type="text"
                                    id="departmentname"
                                    name="name"
                                    value={formdata.name}
                                    onChange={handleformchange}
                                    placeholder="Enter Department Name"
                                    className="border-2 border-gray-700 rounded px-2 py-1" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="departmentdescription" className="md:text-md lg:text-lg font-bold">Department Description</label>
                                <textarea
                                    id="departmentdescription"
                                    name="description"
                                    value={formdata.description}
                                    onChange={handleformchange}
                                    className="border-2 border-gray-700 rounded px-2 py-1 h-[100px]"
                                    placeholder="Write Your Department Description Here"></textarea>
                            </div>
                        </div>
                        <div className="create-department-button flex justify-center items-center">
                            {
                                (formdata.name.trim().length === 0 || formdata.description.trim().length === 0) ? <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-md hover:bg-white hover:text-blue-700" onClick={() => ShowToast()}>Create</Button> :
                                    <DialogClose asChild>
                                        <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-md hover:bg-white hover:text-blue-700" onClick={() => CreateDepartment()}>Create</Button>
                                    </DialogClose>
                            }
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}



export const EmployeesIDSDialogBox = ({ DepartmentID }) => {
    console.log("this is Department ID", DepartmentID)
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const dispatch = useDispatch()
    const [SelectedEmployeesData, Set_selectedEmployeesData] = useState({
        departmentID: DepartmentID,
        employeeIDArray: [],
    })

    const SelectEmployees = (EMID) => {
        if (SelectedEmployeesData.employeeIDArray.includes(EMID)) {
            Set_selectedEmployeesData({ ...SelectedEmployeesData, employeeIDArray: SelectedEmployeesData.employeeIDArray.filter((item) => item !== EMID) })
        }
        else if (!SelectedEmployeesData.employeeIDArray.includes(EMID)) {
            Set_selectedEmployeesData({ ...SelectedEmployeesData }, SelectedEmployeesData.employeeIDArray.push(EMID))
        }
    }

    const ClearSelectedEmployeesData = () => {
        Set_selectedEmployeesData({
            departmentID: DepartmentID,
            employeeIDArray: []
        })
    }

    const SetEmployees = () => {
        dispatch(HandlePatchHRDepartments({ apiroute: "UPDATE", data: SelectedEmployeesData }))
        ClearSelectedEmployeesData()
    }

    console.log(SelectedEmployeesData)

    useEffect(() => {
        Set_selectedEmployeesData(
            {
                departmentID: DepartmentID,
                employeeIDArray: [],
            }
        )
    }, [DepartmentID])

    return (
        <div className="employeeIDs-box-container">
            <Dialog>
                <DialogTrigger className="px-4 py-2 font-bold m-2 bg-blue-600 text-white border-2 border-blue-600 rounded-lg hover:bg-white hover:text-blue-700 min-[250px]:text-xs md:text-sm lg:text-lg" onClick={() => dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))}>Add Employees</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    {EmployeesIDState.isLoading ? <Loading height={"h-auto"} /> : <div className="employeeID-checkbox-container flex flex-col gap-4">
                        <div>
                            <h1 className="font-bold text-2xl">Select Employees</h1>
                        </div>
                        <div className="employeeID-checkbox-group">
                            <Command className="rounded-lg border shadow-md w-full">
                                <CommandInput placeholder="Type a Employee Name..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="All Employees">
                                        {EmployeesIDState.data ? EmployeesIDState.data.map((item, index) => <CommandItem key={index}>
                                            <div className="employeeID-checkbox flex justify-center items-center gap-2">
                                                <input type="checkbox" id={`EmployeeID-${index + 1}`} className="border-2 border-gray-700 w-4 h-4" onClick={() => SelectEmployees(item._id)} checked={SelectedEmployeesData.employeeIDArray.includes(item._id)} disabled={item.department ? true : false} />
                                                <label htmlFor={`EmployeeID-${index + 1}`} className="text-lg">{`${item.firstname} ${item.lastname}`} <span className="text-xs mx-0.5 overflow-hidden text-ellipsis">{item.department ? `(${item.department.name})` : null}</span> </label>
                                            </div>
                                        </CommandItem>) : null}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>
                        <div className="employeeID-checkbox-button-group flex justify-center items-center gap-2">
                            <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700" onClick={() => SetEmployees()}>Add</Button>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 bg-blue-700 border-blue-700 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700" onClick={() => ClearSelectedEmployeesData()}>Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>}

                </DialogContent>
            </Dialog>
        </div>
    )
}

export const RemoveEmployeeFromDepartmentDialogBox = ({ DepartmentName, DepartmentID, EmployeeID }) => {
    const dispatch = useDispatch()

    const RemoveEmployee = (EMID) => {
        dispatch(HandleDeleteHRDepartments({ apiroute: "DELETE", data: { departmentID: DepartmentID, employeeIDArray: [EMID], action: "delete-employee" } }))
    }

    return (
        <div className="remove-employee">
            <Dialog>
                <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">Remove</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">{`Are you sure you want to remove this employee from ${DepartmentName} department ?`}</p>
                        <div className="delete-employee-button-group flex gap-2">
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => RemoveEmployee(EmployeeID)}>Remove</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const AddSalaryDialogBox = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const salaryState = useSelector((state) => state.HRSalaryReducer)
    const employeesIDs = useSelector((state) => state.EMployeesIDReducer.data) || []
    const [open, setOpen] = useState(false)
    
    const [formdata, setformdata] = useState({
        employeeID: "",
        basicpay: "",
        bonusePT: "",
        deductionPT: "",
        duedate: "",
        currency: "INR",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formdata.employeeID || !formdata.basicpay || !formdata.bonusePT || !formdata.deductionPT || !formdata.duedate || !formdata.currency) {
            toast({
                variant: "destructive",
                title: "Missing Fields",
                description: "Please fill all fields",
            })
            return
        }
        await dispatch(HandleCreateSalary({
            employeeID: formdata.employeeID,
            basicpay: Number(formdata.basicpay),
            bonusePT: Number(formdata.bonusePT),
            deductionPT: Number(formdata.deductionPT),
            duedate: formdata.duedate,
            currency: formdata.currency,
        }))
    }

    useEffect(() => {
        if (salaryState.error.status && salaryState.error.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: salaryState.error.message,
            })
        }
    }, [salaryState.error.status, salaryState.error.message])

    useEffect(() => {
        if (!salaryState.isLoading && salaryState.fetchData) {
            toast({
                title: "Success",
                description: "Salary created successfully",
            })
            setformdata({ employeeID: "", basicpay: "", bonusePT: "", deductionPT: "", duedate: "", currency: "INR" })
            setOpen(false)
        }
    }, [salaryState.isLoading, salaryState.fetchData])

    useEffect(() => {
        dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
    }, [dispatch, open])

    return (
        <div className="AddSalary-content">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="bg-blue-800 border-2 border-blue-800 md:px-4 md:py-2 md:text-lg min-[250px]:px-2 min-[250px]:py-1 min-[250px]:text-sm text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">Add Salary</DialogTrigger>
                <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                    <div className="add-salary-container flex flex-col gap-5">
                        <h1 className="font-bold text-2xl">Add Salary Record</h1>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="employeeID" className="font-bold">Employee</label>
                                <select
                                    id="employeeID"
                                    name="employeeID"
                                    required
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata.employeeID}
                                    onChange={handleformchange}
                                >
                                    <option value="">Select employee</option>
                                    {employeesIDs.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.firstname} {emp.lastname} {emp.department?.name ? `(${emp.department.name})` : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="basicpay" className="font-bold">Basic Pay</label>
                                <input
                                    type="number"
                                    id="basicpay"
                                    name="basicpay"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata.basicpay}
                                    onChange={handleformchange}
                                />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="bonusePT" className="font-bold">Bonus %</label>
                                <input
                                    type="number"
                                    id="bonusePT"
                                    name="bonusePT"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata.bonusePT}
                                    onChange={handleformchange}
                                />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="deductionPT" className="font-bold">Deduction %</label>
                                <input
                                    type="number"
                                    id="deductionPT"
                                    name="deductionPT"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata.deductionPT}
                                    onChange={handleformchange}
                                />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="duedate" className="font-bold">Due Date</label>
                                <input
                                    type="date"
                                    id="duedate"
                                    name="duedate"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata.duedate}
                                    onChange={handleformchange}
                                />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="currency" className="font-bold">Currency</label>
                                <select
                                    id="currency"
                                    name="currency"
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                    value={formdata.currency}
                                    onChange={handleformchange}
                                >
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex justify-center">
                                <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg">Create Salary</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const DeleteSalaryDialogBox = ({ SalaryID }) => {
    const dispatch = useDispatch()
    return (
        <div className="delete-salary-dialog-container">
            <Dialog>
                <DialogTrigger className="btn-sm border-2 border-red-700 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-red-700 hover:text-white text-red-700">Delete</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this salary record?</p>
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button className="bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => dispatch(HandleDeleteSalary(SalaryID))}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const DeleteAttendanceDialogBox = ({ AttendanceID }) => {
    const dispatch = useDispatch()
    return (
        <div className="delete-attendance-dialog-container">
            <Dialog>
                <DialogTrigger className="btn-sm border-2 border-red-700 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-red-700 hover:text-white text-red-700">Delete</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this attendance record?</p>
                        <div className="flex gap-2">
                            <DialogClose asChild>
                                <Button className="bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => dispatch(HandleDeleteAttendance(AttendanceID))}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const EmployeeAddLeaveDialogBox = ({ employeeID }) => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const employeeMyDataState = useSelector((state) => state.employeeMyDataReducer)
    const employeeState = useSelector((state) => state.employeereducer)
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({ startdate: "", enddate: "", title: "", reason: "" })
    const resolvedEmployeeID = employeeID || employeeState.data?.data?._id || employeeState.data?._id || ""

    const handleformchange = (e) => CommonStateHandler(formdata, setformdata, e)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formdata.startdate || !formdata.enddate || !formdata.title?.trim() || !formdata.reason?.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please fill all fields",
            })
            return
        }
        if (new Date(formdata.enddate) < new Date(formdata.startdate)) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "End date must be after start date",
            })
            return
        }
        const payload = resolvedEmployeeID
            ? { employeeID: resolvedEmployeeID, ...formdata }
            : { ...formdata }

        const result = await dispatch(HandleCreateLeave(payload))
        if (!result.error) {
            dispatch(HandleGetMyLeaves())
        }
    }

    useEffect(() => {
        if (employeeMyDataState.error.status && employeeMyDataState.error.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: employeeMyDataState.error.message,
            })
        }
    }, [employeeMyDataState.error.status, employeeMyDataState.error.message])

    useEffect(() => {
        if (!employeeMyDataState.isLoading && employeeMyDataState.error.status === false && formdata.title) {
            toast({
                title: "Success",
                description: "Leave request submitted successfully",
            })
            setformdata({ startdate: "", enddate: "", title: "", reason: "" })
            setOpen(false)
        }
    }, [employeeMyDataState.isLoading, employeeMyDataState.error.status])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-blue-800 border-2 border-blue-800 md:px-4 md:py-2 min-[250px]:px-2 min-[250px]:py-1 text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">Request Leave</DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[90vw] md:max-w-[400px]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Request Leave</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-leave-title" className="font-bold">Title</label>
                            <input type="text" id="emp-leave-title" name="title" value={formdata.title} onChange={handleformchange} placeholder="e.g. Sick leave" className="border-2 border-gray-700 rounded px-2 py-1" required />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-leave-start" className="font-bold">Start Date</label>
                            <input type="date" id="emp-leave-start" name="startdate" value={formdata.startdate} onChange={handleformchange} className="border-2 border-gray-700 rounded px-2 py-1" required />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-leave-end" className="font-bold">End Date</label>
                            <input type="date" id="emp-leave-end" name="enddate" value={formdata.enddate} onChange={handleformchange} className="border-2 border-gray-700 rounded px-2 py-1" required />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-leave-reason" className="font-bold">Reason</label>
                            <textarea id="emp-leave-reason" name="reason" value={formdata.reason} onChange={handleformchange} placeholder="Brief reason" className="border-2 border-gray-700 rounded px-2 py-1 min-h-[80px]" required />
                        </div>
                        <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white">Submit Request</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Top-level export for EmployeeEditLeaveDialogBox
export const EmployeeEditLeaveDialogBox = ({ leave, onSuccess }) => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [formdata, setformdata] = useState({
        leaveID: leave?._id,
        startdate: leave?.startdate ? new Date(leave.startdate).toISOString().split("T")[0] : "",
        enddate: leave?.enddate ? new Date(leave.enddate).toISOString().split("T")[0] : "",
        title: leave?.title ?? "",
        reason: leave?.reason ?? "",
    })

    useEffect(() => {
        if (leave) {
            setformdata({
                leaveID: leave._id,
                startdate: leave.startdate ? new Date(leave.startdate).toISOString().split("T")[0] : "",
                enddate: leave.enddate ? new Date(leave.enddate).toISOString().split("T")[0] : "",
                title: leave.title ?? "",
                reason: leave.reason ?? "",
            })
        }
    }, [leave])

    const handleformchange = (e) => CommonStateHandler(formdata, setformdata, e)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formdata.leaveID || !formdata.startdate || !formdata.enddate || !formdata.title?.trim() || !formdata.reason?.trim()) return
        const result = await dispatch(HandleEmployeeUpdateLeave(formdata))
        if (!result.error) {
            toast({ title: "Leave updated", description: "Your leave request was updated successfully." })
        }
        onSuccess?.()
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-blue-700 px-2 py-0.5 rounded-md hover:bg-blue-700 hover:text-white text-blue-700 text-sm">Edit</DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[90vw] md:max-w-[400px]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Edit Leave</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-edit-title" className="font-bold">Title</label>
                            <input type="text" id="emp-edit-title" name="title" value={formdata.title} onChange={handleformchange} className="border-2 border-gray-700 rounded px-2 py-1" required />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-edit-start" className="font-bold">Start Date</label>
                            <input type="date" id="emp-edit-start" name="startdate" value={formdata.startdate} onChange={handleformchange} className="border-2 border-gray-700 rounded px-2 py-1" required />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-edit-end" className="font-bold">End Date</label>
                            <input type="date" id="emp-edit-end" name="enddate" value={formdata.enddate} onChange={handleformchange} className="border-2 border-gray-700 rounded px-2 py-1" required />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="emp-edit-reason" className="font-bold">Reason</label>
                            <textarea id="emp-edit-reason" name="reason" value={formdata.reason} onChange={handleformchange} className="border-2 border-gray-700 rounded px-2 py-1 min-h-[80px]" required />
                        </div>
                        <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white">Update</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// ...existing code...

export const CreateNoticeDialogBox = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const HRNoticeState = useSelector((state) => state.HRNoticeReducer)
    const employeesIDs = useSelector((state) => state.EMployeesIDReducer.data) || []
    const departmentsData = useSelector((state) => state.HRDepartmentPageReducer.data) || []
    const [open, setOpen] = useState(false)
    const [formdata, setformdata] = useState({
        title: "",
        content: "",
        audience: "Department-Specific",
        departmentID: "",
        employeeID: ""
    })

    useEffect(() => {
        if (formdata.audience === "Department-Specific") {
            setformdata(prev => ({ ...prev, employeeID: "" }))
        } else if (formdata.audience === "Employee-Specific") {
            setformdata(prev => ({ ...prev, departmentID: "" }))
        }
    }, [formdata.audience])

    const handleformchange = (event) => {
        const { name, value } = event.target
        setformdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        if (!formdata.title.trim() || !formdata.content.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Title and content are required",
            })
            return
        }
        if (formdata.audience === "Department-Specific" && !formdata.departmentID) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please select a department",
            })
            return
        }
        if (formdata.audience === "Employee-Specific" && !formdata.employeeID) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please select an employee",
            })
            return
        }

        const noticeData = {
            title: formdata.title,
            content: formdata.content,
            audience: formdata.audience,
            departmentID: formdata.audience === "Department-Specific" ? formdata.departmentID : undefined,
            employeeID: formdata.audience === "Employee-Specific" ? formdata.employeeID : undefined
        }

        await dispatch(HandleCreateHRNotice(noticeData))
    }

    useEffect(() => {
        if (HRNoticeState.error.status && HRNoticeState.error.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: HRNoticeState.error.message,
            })
        }
    }, [HRNoticeState.error.status, HRNoticeState.error.message])

    useEffect(() => {
        if (!HRNoticeState.isLoading && HRNoticeState.fetchData) {
            toast({
                title: "Success",
                description: "Notice created successfully",
            })
            setformdata({
                title: "",
                content: "",
                audience: "Department-Specific",
                departmentID: "",
                employeeID: ""
            })
            setOpen(false)
        }
    }, [HRNoticeState.isLoading, HRNoticeState.fetchData])

    useEffect(() => {
        dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
    }, [dispatch, open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-blue-800 border-2 border-blue-800 md:px-4 md:py-2 md:text-lg min-[250px]:px-2 min-[250px]:py-1 min-[250px]:text-sm text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">Create Notice</DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw] max-h-[90vh] overflow-y-auto">
                <div className="create-notice-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Create Notice</h1>
                    </div>
                    <div className="form-container flex flex-col gap-4">
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="notice-title" className="font-bold">Title</label>
                            <input
                                type="text"
                                id="notice-title"
                                name="title"
                                value={formdata.title}
                                onChange={handleformchange}
                                placeholder="Enter notice title"
                                className="border-2 border-gray-700 rounded px-2 py-1"
                            />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="notice-content" className="font-bold">Content</label>
                            <textarea
                                id="notice-content"
                                name="content"
                                value={formdata.content}
                                onChange={handleformchange}
                                placeholder="Enter notice content"
                                className="border-2 border-gray-700 rounded px-2 py-1 min-h-[120px]"
                            />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="notice-audience" className="font-bold">Audience</label>
                            <select
                                id="notice-audience"
                                name="audience"
                                value={formdata.audience}
                                onChange={handleformchange}
                                className="border-2 border-gray-700 rounded px-2 py-1"
                            >
                                <option value="Department-Specific">Department Specific</option>
                                <option value="Employee-Specific">Employee Specific</option>
                            </select>
                        </div>
                        {formdata.audience === "Department-Specific" && (
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="notice-department" className="font-bold">Department</label>
                                <select
                                    id="notice-department"
                                    name="departmentID"
                                    value={formdata.departmentID}
                                    onChange={handleformchange}
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                >
                                    <option value="">Select Department</option>
                                    {departmentsData.map((dept) => (
                                        <option key={dept._id} value={dept._id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {formdata.audience === "Employee-Specific" && (
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="notice-employee" className="font-bold">Employee</label>
                                <select
                                    id="notice-employee"
                                    name="employeeID"
                                    value={formdata.employeeID}
                                    onChange={handleformchange}
                                    className="border-2 border-gray-700 rounded px-2 py-1"
                                >
                                    <option value="">Select Employee</option>
                                    {employeesIDs.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.firstname} {emp.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="create-button flex justify-center">
                            <Button
                                onClick={handleSubmit}
                                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                            >
                                Create Notice
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const ViewNoticeDialogBox = ({ notice }) => {
    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-blue-800 px-2 py-0.5 rounded-md hover:bg-blue-800 hover:text-white text-blue-800 text-sm">View</DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="notice-details-container flex flex-col gap-4">
                    <div className="notice-header">
                        <h1 className="font-bold text-2xl">{notice.title}</h1>
                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded mt-2 ${notice.audience === "Department-Specific" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}>
                            {notice.audience === "Department-Specific" 
                                ? `Department: ${notice.department?.name || "N/A"}` 
                                : `Employee: ${notice.employee ? `${notice.employee.firstname} ${notice.employee.lastname}` : "N/A"}`}
                        </span>
                    </div>
                    <div className="notice-content border-t pt-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{notice.content}</p>
                    </div>
                    <div className="notice-meta border-t pt-2 text-sm text-gray-500">
                        <p>Created by: {notice.createdby ? `${notice.createdby.firstname} ${notice.createdby.lastname}` : "HR"}</p>
                        <p>Created: {new Date(notice.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const EditNoticeDialogBox = ({ notice, onSuccess }) => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        title: notice?.title || "",
        content: notice?.content || ""
    })

    useEffect(() => {
        if (notice) {
            setformdata({
                title: notice.title || "",
                content: notice.content || ""
            })
        }
    }, [notice])

    const handleformchange = (event) => {
        const { name, value } = event.target
        setformdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        if (!formdata.title.trim() || !formdata.content.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Title and content are required",
            })
            return
        }

        dispatch(HandleUpdateHRNotice({
            noticeID: notice._id,
            UpdatedData: {
                title: formdata.title,
                content: formdata.content
            }
        }))
        onSuccess?.()
    }

    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-yellow-600 px-2 py-0.5 rounded-md hover:bg-yellow-600 hover:text-white text-yellow-600 text-sm">Edit</DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                <div className="edit-notice-container flex flex-col gap-5">
                    <div className="heading">
                        <h1 className="font-bold text-2xl">Edit Notice</h1>
                    </div>
                    <div className="form-container flex flex-col gap-4">
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="edit-notice-title" className="font-bold">Title</label>
                            <input
                                type="text"
                                id="edit-notice-title"
                                name="title"
                                value={formdata.title}
                                onChange={handleformchange}
                                className="border-2 border-gray-700 rounded px-2 py-1"
                            />
                        </div>
                        <div className="label-input-field flex flex-col gap-1">
                            <label htmlFor="edit-notice-content" className="font-bold">Content</label>
                            <textarea
                                id="edit-notice-content"
                                name="content"
                                value={formdata.content}
                                onChange={handleformchange}
                                className="border-2 border-gray-700 rounded px-2 py-1 min-h-[120px]"
                            />
                        </div>
                        <div className="edit-button flex justify-center">
                            <Button
                                onClick={handleSubmit}
                                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                            >
                                Update Notice
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteNoticeDialogBox = ({ noticeID, onSuccess }) => {
    const dispatch = useDispatch()
    return (
        <Dialog>
            <DialogTrigger className="btn-sm border-2 border-red-700 px-2 py-0.5 rounded-md hover:bg-red-700 hover:text-white text-red-700 text-sm">Delete</DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this notice?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button
                                className="bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700"
                                onClick={() => {
                                    dispatch(HandleDeleteHRNotice(noticeID))
                                    onSuccess?.()
                                }}
                            >
                                Delete
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
