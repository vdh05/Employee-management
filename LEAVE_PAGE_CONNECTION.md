# Employee Dashboard and Leave Page Connection

## Overview
Employee dashboard and leave pages have been successfully created and connected for both employee and HR users.

## How It Works

### Employee Access to Leave Page:
1. **Dashboard URL**: `/auth/employee/employee-dashboard-index`
2. **Leave Page URL**: `/auth/employee/employee-dashboard-index/leaves`
3. **Sidebar Navigation**: 
   - Dashboard
   - My Salaries
   - My Leaves ← Connected
   - My Attendance
   - My Notices
   - Corporate Calendar

### HR Access to Leave Page:
1. **Dashboard URL**: `/HR/dashboard`
2. **Leave Page URL**: `/HR/dashboard/leaves`
3. **Sidebar Navigation**:
   - Dashboard
   - Employees
   - Departments
   - Salaries
   - Issue Notices
   - Leaves ← Connected (Approve/Reject)
   - Attendances
   - Recruitment
   - Interview Insights
   - Requests
   - HR Profiles
   - Corporate Calendar

## Files Created/Modified:

### Created:
- `client/src/pages/Employees/EmployeeDashboardIndex.jsx` - Employee dashboard with key details
- Updated `client/src/components/common/Dashboard/keydetailboxes.jsx` - Added KeyDetailBoxes component

### Modified:
- `client/src/components/ui/EmployeeSidebar.jsx` - Updated base path and added notices link
- `client/src/pages/HumanResources/Dashboard Childs/leavespage.jsx` - Improved UI and headings

## Features:

### Employee Dashboard:
- Shows dashboard overview with key metrics
- Key detail boxes for Total Leaves, Approved, Pending, Rejected
- Click on any detail box navigates to My Leaves page
- Connected via sidebar navigation

### Leave Functionality:

**Employee Can:**
- View all their leave requests
- Submit new leave requests
- Edit pending leave requests
- Delete pending leave requests

**HR Can:**
- View all employee leave requests
- Approve leave requests
- Reject leave requests
- See employee details on leave requests

## API Endpoints:
- Employee: `/api/v1/leave/my-leaves` (GET)
- Create Leave: `/api/v1/leave/create-leave` (POST)
- Update Leave (Employee): `/api/v1/leave/employee-update-leave` (PATCH)
- All Leaves (HR): `/api/v1/leave/all` (GET)
- Update Leave (HR): `/api/v1/leave/HR-update-leave` (PATCH)

## Routing Structure:
- Employee routes: Defined in `client/src/routes/employeeroutes.jsx`
- HR routes: Defined in `client/src/routes/HRroutes.jsx`
- Both routes are combined in `client/src/routes/AppRoutes.jsx`

## User Flow:
1. Employee logs in → Redirected to `/auth/employee/employee-dashboard-index`
2. Employee clicks "My Leaves" in sidebar → Accesses leave page
3. HR logs in → Redirected to `/HR/dashboard/leaves`
4. HR can view and manage all employee leave requests

## Status:
✅ Employee Dashboard created
✅ Employee Leave page connected and accessible
✅ HR Dashboard updated
✅ HR Leave page accessible and functional
✅ Sidebar navigation working for both roles
✅ Leave management system fully operational
