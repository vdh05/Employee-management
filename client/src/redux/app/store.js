import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from "../Slices/EmployeeSlice.js"
import HRReducer from '../Slices/HRSlice.js'
import DashbaordReducer from "../Slices/DashboardSlice.js"
import HREmployeesPageReducer from '../Slices/HREmployeesPageSlice.js'
import HRDepartmentPageReducer from '../Slices/HRDepartmentPageSlice.js'
import EMployeesIDReducer from '../Slices/EmployeesIDsSlice.js'
import HRSalaryReducer from '../Slices/HRSalarySlice.js'
import HRLeaveReducer from '../Slices/HRLeaveSlice.js'
import HRAttendanceReducer from '../Slices/HRAttendanceSlice.js'
import EmployeeMyDataReducer from '../Slices/EmployeeMyDataSlice.js'
import HRNoticeReducer from '../Slices/HRNoticeSlice.js'
import NotificationReducer from '../Slices/NotificationSlice.js'
import CorporateCalendarReducer from '../Slices/CorporateCalendarSlice.js'

export const store = configureStore({
    reducer: {
        employeereducer: EmployeeReducer,
        employeeMyDataReducer: EmployeeMyDataReducer,
        HRReducer: HRReducer,
        dashboardreducer: DashbaordReducer,
        HREmployeesPageReducer : HREmployeesPageReducer,
        HRDepartmentPageReducer : HRDepartmentPageReducer,
        EMployeesIDReducer : EMployeesIDReducer,
        HRSalaryReducer: HRSalaryReducer,
        HRLeaveReducer: HRLeaveReducer,
        HRAttendanceReducer: HRAttendanceReducer,
        HRNoticeReducer: HRNoticeReducer,
        notificationReducer: NotificationReducer,
        corporateCalendarReducer: CorporateCalendarReducer,
    }
})