import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "../apis/APIService"
import { HRLeaveEndPoints } from "../apis/APIsEndpoints"

export const HandleGetAllLeaves = createAsyncThunk(
    "HandleGetAllLeaves",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(HRLeaveEndPoints.GETALL, {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch leaves" })
        }
    }
)

export const HandleHRUpdateLeave = createAsyncThunk(
    "HandleHRUpdateLeave",
    async ({ leaveID, status }, { rejectWithValue }) => {
        try {
            const response = await apiService.patch(HRLeaveEndPoints.HR_UPDATE, { leaveID, status }, {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update leave" })
        }
    }
)
