import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRNoticeEndPoints } from "../apis/APIsEndpoints";

export const HandleGetHRNotices = createAsyncThunk("HandleGetHRNotices", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(`${HRNoticeEndPoints.GETALL}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleCreateHRNotice = createAsyncThunk("HandleCreateHRNotice", async (noticeData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(`${HRNoticeEndPoints.CREATE}`, noticeData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleUpdateHRNotice = createAsyncThunk("HandleUpdateHRNotice", async ({ noticeID, UpdatedData }, { rejectWithValue }) => {
    try {
        const response = await apiService.patch(`${HRNoticeEndPoints.UPDATE}`, { noticeID, UpdatedData }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const HandleDeleteHRNotice = createAsyncThunk("HandleDeleteHRNotice", async (noticeID, { rejectWithValue }) => {
    try {
        const response = await apiService.delete(`${HRNoticeEndPoints.DELETE(noticeID)}`, {
            withCredentials: true
        });
        return { ...response.data, noticeID };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
