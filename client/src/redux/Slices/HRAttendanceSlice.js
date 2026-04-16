import { createSlice } from "@reduxjs/toolkit"
import { HandleGetAllAttendance, HandleDeleteAttendance } from "../Thunks/HRAttendanceThunk.js"

const HRAttendanceSlice = createSlice({
    name: "HRAttendance",
    initialState: {
        data: null,
        isLoading: false,
        fetchData: false,
        error: { status: false, message: null, content: null },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetAllAttendance.pending, (state) => {
                state.isLoading = true
                state.error.content = null
            })
            .addCase(HandleGetAllAttendance.fulfilled, (state, action) => {
                state.isLoading = false
                state.error.status = false
                state.data = action.payload.data
                state.fetchData = false
            })
            .addCase(HandleGetAllAttendance.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to load attendance"
            })
            .addCase(HandleDeleteAttendance.pending, (state) => { state.isLoading = true })
            .addCase(HandleDeleteAttendance.fulfilled, (state) => {
                state.isLoading = false
                state.error.status = false
                state.fetchData = true
            })
            .addCase(HandleDeleteAttendance.rejected, (state, action) => {
                state.isLoading = false
                state.error.status = true
                state.error.message = action.payload?.message || "Failed to delete attendance"
            })
    },
})

export default HRAttendanceSlice.reducer
