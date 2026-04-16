import { Employee } from "../models/Employee.model.js"
import { Leave } from "../models/Leave.model.js"
import { Attendance } from "../models/Attendance.model.js"


export const HandleCreateLeave = async (req, res) => {
    try {
        const { employeeID, startdate, enddate, title, reason } = req.body
        const resolvedEmployeeID = employeeID || req.EMid

        if (!resolvedEmployeeID || !startdate || !enddate || !title || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const employee = await Employee.findOne({ _id: resolvedEmployeeID, organizationID: req.ORGID })

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        const checkleave = await Leave.findOne({
            employee: resolvedEmployeeID,
            startdate: new Date(startdate),
            enddate: new Date(enddate)
        })


        if (checkleave) {
            return res.status(400).json({ success: false, message: "Leave record already exists for this employee" })
        }

        const leave = await Leave.create({
            employee: resolvedEmployeeID,
            startdate: new Date(startdate),
            enddate: new Date(enddate),
            title,
            reason,
            organizationID: req.ORGID
        })

        employee.leaverequest.push(leave._id)
        await employee.save()

        return res.status(200).json({ success: true, message: "Leave request created successfully", data: leave })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const HandleAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ organizationID: req.ORGID }).populate("employee approvedby", "firstname lastname department")
        return res.status(200).json({ success: true, message: "All leave records retrieved successfully", data: leaves })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.EMid, organizationID: req.ORGID }).populate("approvedby", "firstname lastname").sort({ createdAt: -1 })
        return res.status(200).json({ success: true, message: "My leave records retrieved successfully", data: leaves })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleLeave = async (req, res) => {
    try {
        const { leaveID } = req.params
        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID }).populate("employee approvedby", "firstname lastname department")

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave record not found" })
        }

        return res.status(200).json({ success: true, message: "Leave record retrieved successfully", data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleUpdateLeaveByEmployee = async (req, res) => {
    try {
        const { leaveID, startdate, enddate, title, reason } = req.body

        if (!leaveID || !startdate || !enddate || !title || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave record not found" })
        }

        leave.startdate = new Date(startdate)
        leave.enddate = new Date(enddate)
        leave.title = title
        leave.reason = reason

        await leave.save()

        return res.status(200).json({ success: true, message: "Leave record updated successfully", data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleUpdateLeavebyHR = async (req, res) => {
    try {
        const { leaveID, status } = req.body

        if (!leaveID || !status) {
            return res.status(400).json({ success: false, message: "leaveID and status are required" })
        }

        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave record not found" })
        }

        leave.status = status
        leave.approvedby = req.HRid

        await leave.save()

        const isSickLeave = [leave.title, leave.reason].some((value) =>
            String(value || "").toLowerCase().includes("sick")
        )

        if (status === "Approved" && isSickLeave) {
            const employee = await Employee.findOne({ _id: leave.employee, organizationID: req.ORGID })

            if (employee) {
                let attendance = null
                if (employee.attendance) {
                    attendance = await Attendance.findOne({ _id: employee.attendance, organizationID: req.ORGID })
                }

                if (!attendance) {
                    attendance = await Attendance.create({
                        employee: employee._id,
                        status: "Pending",
                        organizationID: req.ORGID,
                        attendancelog: [],
                    })
                    employee.attendance = attendance._id
                    await employee.save()
                }

                const start = new Date(leave.startdate)
                const end = new Date(leave.enddate)

                for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
                    const dayKey = day.toISOString().split("T")[0]
                    const existingLog = attendance.attendancelog.find((log) =>
                        log?.logdate && new Date(log.logdate).toISOString().split("T")[0] === dayKey
                    )

                    if (existingLog) {
                        existingLog.logstatus = "Pending"
                        existingLog.logreason = "Sick Leave"
                    } else {
                        attendance.attendancelog.push({
                            logdate: new Date(`${dayKey}T00:00:00.000Z`),
                            logstatus: "Pending",
                            logreason: "Sick Leave",
                        })
                    }
                }

                attendance.status = "Pending"
                await attendance.save()
            }
        }

        return res.status(200).json({ success: true, message: "Leave record updated successfully", data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleDeleteLeave = async (req, res) => {
    try {
        const { leaveID } = req.params
        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave record not found" })
        }

        const employee = await Employee.findById(leave.employee)
        const index = employee.leaverequest.indexOf(leaveID)
        employee.leaverequest.splice(index, 1)

        await employee.save()
        await leave.deleteOne()

        return res.status(200).json({ success: true, message: "Leave record deleted successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}