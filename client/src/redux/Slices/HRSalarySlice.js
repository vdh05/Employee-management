import { createSlice } from "@reduxjs/toolkit"
import {
    HandleGetAllSalary,
    HandleCreateSalary,
    HandleUpdateSalary,
    HandleDeleteSalary,
} from "../Thunks/HRSalaryThunk.js"

const HRSalarySlice = createSlice({
    name: "HRSalary",
    initialState: {
        data: null,
        isLoading: false,
        fetchData: false,
        error: {
            status: false,
            message: null,
            content: null,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetAllSalary.pending, (state) => {
                state.isLoading = true
                state.error.content = null
            })
            .addCase(HandleGetAllSalary.fulfilled, (state, action) => {
                state.isLoading = false
                state.error.status = false
                state.error.message = null
                state.error.content = null
                state.data = action.payload.data
                state.fetchData = false
            })
            .addCase(HandleGetAllSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to load salaries"
                state.error.content = action.payload
            })
            .addCase(HandleCreateSalary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(HandleCreateSalary.fulfilled, (state) => {
                state.isLoading = false
                state.error.status = false
                state.fetchData = true
            })
            .addCase(HandleCreateSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to create salary"
                state.error.content = action.payload
            })
            .addCase(HandleUpdateSalary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(HandleUpdateSalary.fulfilled, (state) => {
                state.isLoading = false
                state.error.status = false
                state.fetchData = true
            })
            .addCase(HandleUpdateSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to update salary"
                state.error.content = action.payload
            })
            .addCase(HandleDeleteSalary.pending, (state) => {
                state.isLoading = true
            })
            .addCase(HandleDeleteSalary.fulfilled, (state) => {
                state.isLoading = false
                state.error.status = false
                state.fetchData = true
            })
            .addCase(HandleDeleteSalary.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to delete salary"
                state.error.content = action.payload
            })
    },
})

export default HRSalarySlice.reducer
