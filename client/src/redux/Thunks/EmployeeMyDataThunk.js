import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { APIsEndPoints } from "../apis/APIsEndpoints.js";

export const HandleGetMySalary = createAsyncThunk(
    "employeeMyData/getMySalary",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(APIsEndPoints.MY_SALARY, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch salary" });
        }
    }
);

export const HandleGetMyLeaves = createAsyncThunk(
    "employeeMyData/getMyLeaves",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(APIsEndPoints.MY_LEAVES, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch leaves" });
        }
    }
);

export const HandleGetMyAttendance = createAsyncThunk(
    "employeeMyData/getMyAttendance",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(APIsEndPoints.MY_ATTENDANCE, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch attendance" });
        }
    }
);

export const HandleCreateLeave = createAsyncThunk(
    "employeeMyData/createLeave",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiService.post(APIsEndPoints.CREATE_LEAVE, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to create leave" });
        }
    }
);

export const HandleEmployeeUpdateLeave = createAsyncThunk(
    "employeeMyData/updateLeave",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiService.patch(APIsEndPoints.EMPLOYEE_UPDATE_LEAVE, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update leave" });
        }
    }
);

export const HandleDeleteLeave = createAsyncThunk(
    "employeeMyData/deleteLeave",
    async (leaveID, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(APIsEndPoints.DELETE_LEAVE(leaveID), { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to delete leave" });
        }
    }
);

export const HandleInitializeAttendance = createAsyncThunk(
    "employeeMyData/initializeAttendance",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiService.post(APIsEndPoints.INITIALIZE_ATTENDANCE, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to initialize attendance" });
        }
    }
);

export const HandleUpdateAttendance = createAsyncThunk(
    "employeeMyData/updateAttendance",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiService.patch(APIsEndPoints.UPDATE_ATTENDANCE, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update attendance" });
        }
    }
);
