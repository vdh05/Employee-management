import { createSlice } from "@reduxjs/toolkit";
import { HandleGetHRNotices, HandleCreateHRNotice, HandleUpdateHRNotice, HandleDeleteHRNotice } from "../Thunks/HRNoticeThunk";

const HRNoticeSlice = createSlice({
    name: "HRNotice",
    initialState: {
        departmentNotices: [],
        employeeNotices: [],
        isLoading: false,
        success: false,
        fetchData: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetHRNotices.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleGetHRNotices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.error.message = null;
                state.error.content = null;
                state.departmentNotices = action.payload.data?.department_notices || [];
                state.employeeNotices = action.payload.data?.employee_notices || [];
                state.success = action.payload.success;
            })
            .addCase(HandleGetHRNotices.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message || "Failed to fetch notices";
                state.error.content = action.payload;
            })
            .addCase(HandleCreateHRNotice.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleCreateHRNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.success = action.payload.success;
                state.fetchData = true;
            })
            .addCase(HandleCreateHRNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message || "Failed to create notice";
                state.error.content = action.payload;
            })
            .addCase(HandleUpdateHRNotice.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleUpdateHRNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.success = action.payload.success;
                state.fetchData = true;
            })
            .addCase(HandleUpdateHRNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message || "Failed to update notice";
                state.error.content = action.payload;
            })
            .addCase(HandleDeleteHRNotice.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleDeleteHRNotice.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.success = action.payload.success;
                state.fetchData = true;
            })
            .addCase(HandleDeleteHRNotice.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message || "Failed to delete notice";
                state.error.content = action.payload;
            });
    }
});

export default HRNoticeSlice.reducer;
