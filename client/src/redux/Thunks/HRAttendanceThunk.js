import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "../apis/apiService"
import { HRAttendanceEndPoints } from "../apis/APIsEndpoints"

export const HandleGetAllAttendance = createAsyncThunk(
    "HandleGetAllAttendance",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(HRAttendanceEndPoints.GETALL, {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch attendance" })
        }
    }
)

export const HandleDeleteAttendance = createAsyncThunk(
    "HandleDeleteAttendance",
    async (attendanceID, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(HRAttendanceEndPoints.DELETE(attendanceID), {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to delete attendance" })
        }
    }
)
