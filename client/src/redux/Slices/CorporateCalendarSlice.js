import { createSlice } from "@reduxjs/toolkit";
import {
    HandleGetCorporateCalendarEvents,
    HandleGetEmployeeCalendarEvents,
    HandleCreateCorporateCalendarEvent,
    HandleUpdateCorporateCalendarEvent,
    HandleDeleteCorporateCalendarEvent
} from "../Thunks/CorporateCalendarThunk";

const initialState = {
    events: [],
    isLoading: false,
    error: null,
    fetchData: false,
};

const CorporateCalendarSlice = createSlice({
    name: "CorporateCalendarReducer",
    initialState,
    reducers: {
        clearCorporateCalendarError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetCorporateCalendarEvents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(HandleGetCorporateCalendarEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload.data || [];
                state.fetchData = false;
            })
            .addCase(HandleGetCorporateCalendarEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to fetch events";
            })
            .addCase(HandleGetEmployeeCalendarEvents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(HandleGetEmployeeCalendarEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload.data || [];
                state.fetchData = false;
            })
            .addCase(HandleGetEmployeeCalendarEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to fetch events";
            })
            .addCase(HandleCreateCorporateCalendarEvent.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(HandleCreateCorporateCalendarEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events.push(action.payload.data);
                state.fetchData = true;
            })
            .addCase(HandleCreateCorporateCalendarEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to create event";
            })
            .addCase(HandleUpdateCorporateCalendarEvent.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(HandleUpdateCorporateCalendarEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.events.findIndex(e => e._id === action.payload.data._id);
                if (index !== -1) {
                    state.events[index] = action.payload.data;
                }
                state.fetchData = true;
            })
            .addCase(HandleUpdateCorporateCalendarEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to update event";
            })
            .addCase(HandleDeleteCorporateCalendarEvent.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(HandleDeleteCorporateCalendarEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = state.events.filter(e => e._id !== action.payload.eventID);
                state.fetchData = true;
            })
            .addCase(HandleDeleteCorporateCalendarEvent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to delete event";
            });
    },
});

export const { clearCorporateCalendarError } = CorporateCalendarSlice.actions;
export default CorporateCalendarSlice.reducer;
