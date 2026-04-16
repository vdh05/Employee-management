import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "../apis/APIService"
import { HRSalaryEndPoints } from "../apis/APIsEndpoints"

export const HandleGetAllSalary = createAsyncThunk(
    "HandleGetAllSalary",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(HRSalaryEndPoints.GETALL, {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch salaries" })
        }
    }
)

export const HandleCreateSalary = createAsyncThunk(
    "HandleCreateSalary",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiService.post(HRSalaryEndPoints.CREATE, data, {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to create salary" })
        }
    }
)

export const HandleUpdateSalary = createAsyncThunk(
    "HandleUpdateSalary",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiService.patch(HRSalaryEndPoints.UPDATE, data, {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update salary" })
        }
    }
)

export const HandleDeleteSalary = createAsyncThunk(
    "HandleDeleteSalary",
    async (salaryID, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(HRSalaryEndPoints.DELETE(salaryID), {
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to delete salary" })
        }
    }
)
