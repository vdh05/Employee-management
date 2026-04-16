import mongoose from 'mongoose'
import { Schema } from "mongoose";

const CorporateCalendarSchema = new Schema({
    eventtitle: {
        type: String,
        required: true
    },
    eventdate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    audience: {
        type: String,
        required: true
    },
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
}, { timestamps: true });

export const CorporateCalendar = mongoose.model("CorporateCalendar", CorporateCalendarSchema)

