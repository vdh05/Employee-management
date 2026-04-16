import { Attendance } from "../models/Attendance.model.js"
import { Employee } from "../models/Employee.model.js"

export const HandleInitializeAttendance = async (req, res) => {
    try {
        const { employeeID } = req.body
        const resolvedEmployeeID = employeeID || req.EMid

        if (!resolvedEmployeeID) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const employee = await Employee.findOne({ _id: resolvedEmployeeID, organizationID: req.ORGID })

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        if (employee.attendance) {
            return res.status(400).json({ success: false, message: "Attendance Log already initialized for this employee" })
        }

        const currentdate = new Date().toISOString().split("T")[0]
        const attendancelog = {
            logdate: new Date(`${currentdate}T00:00:00.000Z`),
            logstatus: "Not Specified"
        }

        const newAttendance = await Attendance.create({
            employee: resolvedEmployeeID,
            status: "Not Specified",
            organizationID: req.ORGID
        })

        newAttendance.attendancelog.push(attendancelog)
        employee.attendance = newAttendance._id

        await employee.save()
        await newAttendance.save()

        return res.status(200).json({ success: true, message: "Attendance Log Initialized Successfully", data: newAttendance })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ organizationID: req.ORGID }).populate("employee", "firstname lastname department")
        return res.status(200).json({ success: true, message: "All attendance records retrieved successfully", data: attendance })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleMyAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findOne({ employee: req.EMid, organizationID: req.ORGID })
        return res.status(200).json({ success: true, message: "My attendance retrieved successfully", data: attendance })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleAttendance = async (req, res) => {
    try {
        const { attendanceID } = req.params

        if (!attendanceID) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const attendance = await Attendance.findOne({ _id: attendanceID, organizationID: req.ORGID }).populate("employee", "firstname lastname department")

        if (!attendance) {
            return res.status(404).json({ success: false, message: "Attendance not found" })
        }

        return res.status(200).json({ success: true, message: "Attendance record retrieved successfully", data: attendance })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleUpdateAttendance = async (req, res) => {
    try {
        const { attendanceID, status, currentdate, reason } = req.body

        if (!status || !currentdate) {
            return res.status(400).json({ success: false, message: "status and currentdate are required" })
        }

        const today = new Date().toISOString().split("T")[0]
        if (currentdate < today) {
            return res.status(400).json({ success: false, message: "Past date attendance cannot be added" })
        }

        let attendance = null

        if (attendanceID) {
            attendance = await Attendance.findOne({ _id: attendanceID, organizationID: req.ORGID })
        }

        if (!attendance) {
            const employee = await Employee.findOne({ _id: req.EMid, organizationID: req.ORGID })

            if (!employee) {
                return res.status(404).json({ success: false, message: "Employee not found" })
            }

            if (employee.attendance) {
                attendance = await Attendance.findOne({ _id: employee.attendance, organizationID: req.ORGID })
            }

            if (!attendance) {
                attendance = await Attendance.create({
                    employee: employee._id,
                    status: "Not Specified",
                    organizationID: req.ORGID,
                    attendancelog: []
                })
                employee.attendance = attendance._id
                await employee.save()
            }
        }

        const effectiveDate = new Date(`${currentdate}T00:00:00.000Z`)
        const FindDate = attendance.attendancelog.find((item) => {
            if (!item?.logdate) return false
            return new Date(item.logdate).toISOString().split("T")[0] === currentdate
        })

        if (!FindDate) {
            const newLog = {
                logdate: effectiveDate,
                logstatus: status,
                logreason: reason || null,
            }
            attendance.attendancelog.push(newLog)
        }
        else {
            FindDate.logstatus = status
            FindDate.logreason = reason || null
        }

        attendance.status = status

        await attendance.save()
        return res.status(200).json({ success: true, message: "Attendance status updated successfully", data: attendance })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleDeleteAttendance = async (req, res) => {
    try {
        const { attendanceID } = req.params
        const attendance = await Attendance.findOne({ _id: attendanceID, organizationID: req.ORGID })

        if (!attendance) {
            return res.status(404).json({ success: false, message: "Attendance not found" })
        }

        const employee = await Employee.findById(attendance.employee)
        employee.attendance = null

        await employee.save()
        await attendance.deleteOne()

        return res.status(200).json({ success: true, message: "Attendance record deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}