
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AsyncReducer } from "../AsyncReducers/asyncreducer"
import { HandlePostEmployees, HandleGetEmployees, HandlePostEmployeeLogout, HandleGetEmployeeProfile } from "../Thunks/EmployeeThunk"
import { TokenManager } from "../../utils/tokenManager"

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
        // Handle HandlePostEmployees with custom logic for token storage
        builder
            .addCase(HandlePostEmployees.pending, (state) => {
                state.isLoading = true;
                state.error.content = null;
            })
            .addCase(HandlePostEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error.status = false;
                state.data = action.payload;
                
                // Store token if it's a login response
                if (action.payload.type === "LOGIN" && action.payload.token) {
                    TokenManager.setEmployeeToken(action.payload.token);
                }
                
                if (action.payload.resetpassword) {
                    state.isAuthenticated = false;
                    state.isResetPasswords = action.payload.success
                }
                else {
                    state.isAuthenticated = action.payload.success;
                }
            })
            .addCase(HandlePostEmployees.rejected, (state, action) => {
                state.isLoading = false;

                if (action.payload?.gologin) {
                    // Keep a freshly authenticated session intact; only clear auth on true session checks.
                    if (!state.isAuthenticated) {
                        state.isAuthenticated = false;
                    }
                    state.error.status = false;
                    state.error.message = action.payload.message;
                    state.error.content = action.payload;
                } else {
                    state.error.status = true;
                    state.error.message = action.payload.message;
                    state.error.content = action.payload;
                }
            });
        
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
                TokenManager.clearEmployeeToken();
            })
            .addCase(HandlePostEmployeeLogout.rejected, (state, action) => {
                state.isLoading = false;
                // Even if logout fails, clear auth state
                state.isAuthenticated = false;
                state.data = null;
                TokenManager.clearEmployeeToken();
            });
    }
})

export default EmployeeSlice.reducer
