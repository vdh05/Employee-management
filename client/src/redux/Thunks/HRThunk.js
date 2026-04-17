import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { HREndPoints } from "../apis/APIsEndpoints";

export const HandleGetHumanResources = createAsyncThunk("HandleGetHumanResources", async (HRData, { rejectWithValue }) => {
    try {
        const { apiroute, email } = HRData;
        const response = await apiService.get(`${HREndPoints[apiroute]}`, {
            params: email ? { email } : undefined
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message || "Request failed" });
    }
})

export const HandlePostHumanResources = createAsyncThunk("HandlePostHumanResources", async (HRData, { rejectWithValue }) => {
    try {
        const { apiroute, data, type } = HRData
        if (type == "resetpassword") {
            const response = await apiService.post(`${HREndPoints.RESET_PASSWORD(apiroute)}`, data)
            return response.data
        }
        else {
            const response = await apiService.post(`${HREndPoints[apiroute]}`, data)
            if (response.status === 200 || response.status === 201) {
                return response.data
            } else {
                return rejectWithValue(response.data);
            }
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message || "Request failed" });
    }
})

export const HandlePutHumanResources = createAsyncThunk("HandlePutHumanResources", async (HRData, { rejectWithValue }) => { })

export const HandlePatchHumanResources = createAsyncThunk("HandlePutHumanResources", async (HRData, { rejectWithValue }) => { })

export const HandleDeleteHumanResources = createAsyncThunk("HandlePutHumanResources", async (HRData, { rejectWithValue }) => { })
