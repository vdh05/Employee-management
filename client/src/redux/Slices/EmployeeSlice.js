
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AsyncReducer } from "../AsyncReducers/asyncreducer"
import { HandlePostEmployees, HandleGetEmployees, HandlePostEmployeeLogout, HandleGetEmployeeProfile } from "../Thunks/EmployeeThunk"

const EmployeeSlice = createSlice({
    name: 'employees',
    initialState: {
        data: null, 
        isLoading: false,
        isAuthenticated: false,
        isAuthourized: false,
        isResetPasswords: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        AsyncReducer(builder, HandlePostEmployees); 
        AsyncReducer(builder, HandleGetEmployees);
        builder
            .addCase(HandleGetEmployeeProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandleGetEmployeeProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                // Store only the employee object, not the whole response
                state.data = action.payload?.data || null;
                state.isAuthenticated = true;
            })
            .addCase(HandleGetEmployeeProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload?.message || "Failed to fetch profile";
                state.data = null;
                // Keep an already authenticated session intact; do not force logout on a transient profile fetch failure.
                if (!state.isAuthenticated) {
                    state.isAuthenticated = false;
                }
            })
            .addCase(HandlePostEmployeeLogout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(HandlePostEmployeeLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.data = null;
                state.error = { status: false, message: null, content: null };
            })
            .addCase(HandlePostEmployeeLogout.rejected, (state, action) => {
                state.isLoading = false;
                // Even if logout fails, clear auth state
                state.isAuthenticated = false;
                state.data = null;
            });
    }
})

export default EmployeeSlice.reducer
