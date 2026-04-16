import { createSlice } from "@reduxjs/toolkit";
import {
    HandleGetMySalary,
    HandleGetMyLeaves,
    HandleGetMyAttendance,
    HandleCreateLeave,
    HandleEmployeeUpdateLeave,
    HandleDeleteLeave,
    HandleInitializeAttendance,
    HandleUpdateAttendance,
} from "../Thunks/EmployeeMyDataThunk.js";

const setPayloadData = (state, action, key) => {
    state[key] = action.payload?.data ?? (key === "myAttendance" ? null : []);
    state.isLoading = false;
    state.error.status = false;
    state.error.message = null;
    state.error.content = null;
};

const setError = (state, action, message) => {
    state.isLoading = false;
    state.error.status = true;
    state.error.message = action.payload?.message || message;
    state.error.content = action.payload;
};

const EmployeeMyDataSlice = createSlice({
    name: "employeeMyData",
    initialState: {
        mySalary: [],
        myLeaves: [],
        myAttendance: null,
        isLoading: false,
        error: { status: false, message: null, content: null },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetMySalary.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleGetMySalary.fulfilled, (state, action) => {
                setPayloadData(state, action, "mySalary");
            })
            .addCase(HandleGetMySalary.rejected, (state, action) => {
                setError(state, action, "Failed to load salaries");
            })
            .addCase(HandleGetMyLeaves.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleGetMyLeaves.fulfilled, (state, action) => {
                setPayloadData(state, action, "myLeaves");
            })
            .addCase(HandleGetMyLeaves.rejected, (state, action) => {
                setError(state, action, "Failed to load leaves");
            })
            .addCase(HandleGetMyAttendance.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandleGetMyAttendance.fulfilled, (state, action) => {
                setPayloadData(state, action, "myAttendance");
            })
            .addCase(HandleGetMyAttendance.rejected, (state, action) => {
                setError(state, action, "Failed to load attendance");
            })
            .addCase(HandleCreateLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandleCreateLeave.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                if (Array.isArray(state.myLeaves)) state.myLeaves = [action.payload?.data, ...state.myLeaves];
                else state.myLeaves = action.payload?.data ? [action.payload.data] : [];
            })
            .addCase(HandleCreateLeave.rejected, (state, action) => {
                setError(state, action, "Failed to create leave");
            })
            .addCase(HandleEmployeeUpdateLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandleEmployeeUpdateLeave.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                const updated = action.payload?.data;
                if (updated && Array.isArray(state.myLeaves)) {
                    const idx = state.myLeaves.findIndex((l) => l._id === updated._id);
                    if (idx !== -1) state.myLeaves[idx] = updated;
                }
            })
            .addCase(HandleEmployeeUpdateLeave.rejected, (state, action) => {
                setError(state, action, "Failed to update leave");
            })
            .addCase(HandleDeleteLeave.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandleDeleteLeave.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                const leaveID = action.meta?.arg;
                if (leaveID && Array.isArray(state.myLeaves)) {
                    state.myLeaves = state.myLeaves.filter((l) => l._id !== leaveID);
                }
            })
            .addCase(HandleDeleteLeave.rejected, (state, action) => {
                setError(state, action, "Failed to delete leave");
            })
            .addCase(HandleInitializeAttendance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandleInitializeAttendance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.myAttendance = action.payload?.data ?? null;
            })
            .addCase(HandleInitializeAttendance.rejected, (state, action) => {
                setError(state, action, "Failed to initialize attendance");
            })
            .addCase(HandleUpdateAttendance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandleUpdateAttendance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.myAttendance = action.payload?.data ?? state.myAttendance;
            })
            .addCase(HandleUpdateAttendance.rejected, (state, action) => {
                setError(state, action, "Failed to update attendance");
            });
    },
});

export default EmployeeMyDataSlice.reducer;
