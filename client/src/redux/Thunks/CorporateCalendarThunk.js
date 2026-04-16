import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/APIService";
import { CorporateCalendarEndPoints } from "../apis/APIsEndpoints";

export const HandleGetCorporateCalendarEvents = createAsyncThunk("HandleGetCorporateCalendarEvents", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${CorporateCalendarEndPoints.GETALL}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleGetEmployeeCalendarEvents = createAsyncThunk("HandleGetEmployeeCalendarEvents", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${CorporateCalendarEndPoints.GETALLEMP}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleCreateCorporateCalendarEvent = createAsyncThunk("HandleCreateCorporateCalendarEvent", async (eventData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${CorporateCalendarEndPoints.CREATE}`, eventData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleUpdateCorporateCalendarEvent = createAsyncThunk("HandleUpdateCorporateCalendarEvent", async ({ eventID, updatedData }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${CorporateCalendarEndPoints.UPDATE}`, { eventID, updatedData }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteCorporateCalendarEvent = createAsyncThunk("HandleDeleteCorporateCalendarEvent", async (eventID, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${CorporateCalendarEndPoints.DELETE(eventID)}`, {
            withCredentials: true
        });
        return { ...response.data, eventID };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
