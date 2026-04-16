export const APIsEndPoints = {
    LOGIN: "/api/auth/employee/login",
    CHECKELOGIN: "/api/auth/employee/check-login",
    LOGOUT: "/api/auth/employee/logout",
    FORGOT_PASSWORD: "/api/auth/employee/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/employee/reset-password/${token}`,
    GET_PROFILE: "/api/v1/employee/by-employee",
    MY_SALARY: "/api/v1/salary/my-records",
    MY_LEAVES: "/api/v1/leave/my-leaves",
    MY_ATTENDANCE: "/api/v1/attendance/my-attendance",
    CREATE_LEAVE: "/api/v1/leave/create-leave",
    EMPLOYEE_UPDATE_LEAVE: "/api/v1/leave/employee-update-leave",
    DELETE_LEAVE: (leaveID) => `/api/v1/leave/delete-leave/${leaveID}`,
    INITIALIZE_ATTENDANCE: "/api/v1/attendance/initialize",
    UPDATE_ATTENDANCE: "/api/v1/attendance/update-attendance",
    MY_NOTICES: "/api/v1/employee/notice/my-notices",
}

export const HREndPoints = {
    SIGNUP: "/api/auth/HR/signup",
    CHECKLOGIN: "/api/auth/HR/check-login",
    LOGIN: "/api/auth/HR/login",
    GETALL: "/api/v1/hr/all",
    VERIFY_EMAIL: "/api/auth/HR/verify-email",
    CHECK_VERIFY_EMAIL: "/api/auth/HR/check-verify-email",
    RESEND_VERIFY_EMAIL: "/api/auth/HR/resend-verify-email",
    FORGOT_PASSWORD: "/api/auth/HR/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/HR/reset-password/${token}` 
}

export const RecruitmentEndPoints = {
    GETALL: "/api/v1/recruitment/all",
    CREATE: "/api/v1/recruitment/create-recruitment",
    GETONE: (recruitmentID) => `/api/v1/recruitment/${recruitmentID}`,
    UPDATE: "/api/v1/recruitment/update-recruitment",
    DELETE: (recruitmentID) => `/api/v1/recruitment/delete-recruitment/${recruitmentID}`,
}

export const ApplicantEndPoints = {
    GETALL: "/api/v1/applicant/all",
    CREATE: "/api/v1/applicant/create-applicant",
    GETONE: (applicantID) => `/api/v1/applicant/${applicantID}`,
    UPDATE: "/api/v1/applicant/update-applicant",
    DELETE: (applicantID) => `/api/v1/applicant/delete-applicant/${applicantID}`,
}

export const DashboardEndPoints = {
    GETDATA: "/api/v1/dashboard/HR-dashboard"
}

export const HREmployeesPageEndPoints = {
    GETALL: "/api/v1/employee/all",
    ADDEMPLOYEE: "/api/auth/employee/signup",
    GETONE: (EMID) => `/api/v1/employee/by-HR/${EMID}`,
    DELETE: (EMID) => `/api/v1/employee/delete-employee/${EMID}`
}

export const HRDepartmentPageEndPoints = {
    GETALL: "/api/v1/department/all",
    CREATE: "/api/v1/department/create-department",
    UPDATE: "/api/v1/department/update-department",
    DELETE: "/api/v1/department/delete-department"
}

export const EmployeesIDsEndPoints = {
    GETALL: "/api/v1/employee/all-employees-ids",
}

export const HRSalaryEndPoints = {
    GETALL: "/api/v1/salary/all",
    CREATE: "/api/v1/salary/create-salary",
    GETONE: (salaryID) => `/api/v1/salary/${salaryID}`,
    UPDATE: "/api/v1/salary/update-salary",
    DELETE: (salaryID) => `/api/v1/salary/delete-salary/${salaryID}`,
}

export const HRLeaveEndPoints = {
    GETALL: "/api/v1/leave/all",
    GETONE: (leaveID) => `/api/v1/leave/${leaveID}`,
    HR_UPDATE: "/api/v1/leave/HR-update-leave",
}

export const HRAttendanceEndPoints = {
    GETALL: "/api/v1/attendance/all",
    GETONE: (attendanceID) => `/api/v1/attendance/${attendanceID}`,
    DELETE: (attendanceID) => `/api/v1/attendance/delete-attendance/${attendanceID}`,
}

export const HRNoticeEndPoints = {
    GETALL: "/api/v1/notice/all/",
    CREATE: "/api/v1/notice/create-notice",
    GETONE: (noticeID) => `/api/v1/notice/${noticeID}`,
    UPDATE: "/api/v1/notice/update-notice",
    DELETE: (noticeID) => `/api/v1/notice/delete-notice/${noticeID}`,
}

export const CorporateCalendarEndPoints = {
    GETALL: "/api/v1/corporate-calendar/all",
    GETALLEMP: "/api/v1/corporate-calendar/employee-events",
    CREATE: "/api/v1/corporate-calendar/create-event",
    GETONE: (eventID) => `/api/v1/corporate-calendar/${eventID}`,
    UPDATE: "/api/v1/corporate-calendar/update-event",
    DELETE: (eventID) => `/api/v1/corporate-calendar/delete-event/${eventID}`,
}