import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HRNoticeEndPoints } from "../apis/APIsEndpoints";
import { setNotifications, addNotification } from "../Slices/NotificationSlice";

export const HandleGetNotifications = createAsyncThunk(
    "HandleGetNotifications",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await apiService.get(`${HRNoticeEndPoints.GETALL}`, {
                withCredentials: true
            });
            if (response.data?.data) {
                dispatch(setNotifications(response.data.data.department_notices || []));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch notifications" });
        }
    }
);

let pollingInterval = null;

export const startNotificationPolling = () => (dispatch, getState) => {
    if (pollingInterval) return;
    
    dispatch(HandleGetNotifications());
    
    pollingInterval = setInterval(() => {
        dispatch(HandleGetNotifications());
    }, 30000);
};

export const stopNotificationPolling = () => () => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
};
