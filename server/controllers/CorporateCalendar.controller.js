import { CorporateCalendar } from "../models/CorporateCalendar.model.js"
import { Employee } from "../models/Employee.model.js"

export const HandleCreateEvent = async (req, res) => {
    try {
        const { eventtitle, eventdate, description, audience, departmentID } = req.body

        if (!eventtitle || !eventdate || !description || !audience) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }


        const parsedDate = new Date(eventdate)
        if (Number.isNaN(parsedDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid event date" })
        }

        const startOfDay = new Date(parsedDate)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(parsedDate)
        endOfDay.setHours(23, 59, 59, 999)

        const query = {
            eventtitle: eventtitle,
            audience: audience,
            organizationID: req.ORGID,
            eventdate: { $gte: startOfDay, $lte: endOfDay },
        }

        if (audience === "Department-Specific" && departmentID) {
            query.departmentID = departmentID
        }

        const event = await CorporateCalendar.findOne(query)

        if (event) {
            return res.status(409).json({ success: false, message: "Same event already exists on this date for this audience" })
        }

        const newEvent = await CorporateCalendar.create({
            eventtitle: eventtitle,
            eventdate: eventdate,
            description: description,
            audience: audience,
            departmentID: audience === "Department-Specific" ? departmentID : null,
            organizationID: req.ORGID
        })

        return res.status(200).json({ success: true, message: "Event created successfully", data: newEvent })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleAllEvents = async (req, res) => {
    try {
        const events = await CorporateCalendar.find({ organizationID: req.ORGID }).populate("departmentID")
        return res.status(200).json({ success: true, message: "All events retrieved successfully", data: events })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleEmployeeEvents = async (req, res) => {
    try {
        const employee = await Employee.findById(req.EMid).select("department")
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        const events = await CorporateCalendar.find({
            organizationID: req.ORGID,
            $or: [
                { audience: "All Employees" },
                { audience: "Department-Specific", departmentID: employee.department }
            ]
        }).populate("departmentID")

        return res.status(200).json({ success: true, message: "Employee events retrieved successfully", data: events })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}


export const HandleEvent = async (req, res) => {
    try {
        const { eventID } = req.params
        const event = await CorporateCalendar.findOne({ _id: eventID, organizationID: req.ORGID }).populate("departmentID")

        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        return res.status(200).json({ success: true, message: "Event retrieved successfully", data: event })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleUpdateEvent = async (req, res) => {
    try {
        const { eventID, updatedData } = req.body
        
        if (updatedData.audience !== "Department-Specific") {
            updatedData.departmentID = null
        }

        const event = await CorporateCalendar.findByIdAndUpdate(eventID, updatedData, { new: true })

        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        return res.status(200).json({ success: true, message: "Event updated successfully", data: event })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}


export const HandleDeleteEvent = async (req, res) => {
    try {
        const { eventID } = req.params
        const deletedEvent = await CorporateCalendar.findByIdAndDelete(eventID)

        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        return res.status(200).json({ success: true, message: "Event deleted successfully" })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}
