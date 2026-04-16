import { createSlice } from "@reduxjs/toolkit"
import { HandleGetAllLeaves, HandleHRUpdateLeave } from "../Thunks/HRLeaveThunk.js"

const HRLeaveSlice = createSlice({
    name: "HRLeave",
    initialState: {
        data: null,
        isLoading: false,
        fetchData: false,
        error: { status: false, message: null, content: null },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetAllLeaves.pending, (state) => {
                state.isLoading = true
                state.error.content = null
            })
            .addCase(HandleGetAllLeaves.fulfilled, (state, action) => {
                state.isLoading = false
                state.error.status = false
                state.data = action.payload.data
                state.fetchData = false
            })
            .addCase(HandleGetAllLeaves.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to load leaves"
            })
            .addCase(HandleHRUpdateLeave.pending, (state) => { state.isLoading = true })
            .addCase(HandleHRUpdateLeave.fulfilled, (state) => {
                state.isLoading = false
                state.error.status = false
                state.fetchData = true
            })
            .addCase(HandleHRUpdateLeave.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to update leave"
            })
    },
})

export default HRLeaveSlice.reducer
