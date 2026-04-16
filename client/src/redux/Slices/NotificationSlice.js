import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
    name: "notifications",
    initialState: {
        items: [],
        unreadCount: 0,
        isLoading: false,
        isOpen: false,
        lastFetched: null,
    },
    reducers: {
        setNotifications: (state, action) => {
            const newNotifications = action.payload || [];
            const existingIds = state.items.map(n => n._id);
            const newItems = newNotifications.filter(n => !existingIds.includes(n._id));
            
            if (newItems.length > 0) {
                state.items = [...newItems, ...state.items].slice(0, 50);
                state.unreadCount = state.items.length;
            }
            state.lastFetched = new Date().toISOString();
            state.isLoading = false;
        },
        addNotification: (state, action) => {
            const newNotification = action.payload;
            if (!state.items.find(n => n._id === newNotification._id)) {
                state.items.unshift(newNotification);
                state.unreadCount = state.items.length;
            }
        },
        markAsRead: (state, action) => {
            const notificationId = action.payload;
            const notification = state.items.find(n => n._id === notificationId);
            if (notification) {
                notification.isRead = true;
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            }
        },
        markAllAsRead: (state) => {
            state.items.forEach(n => n.isRead = true);
            state.unreadCount = 0;
        },
        clearNotifications: (state) => {
            state.items = [];
            state.unreadCount = 0;
        },
        toggleNotificationPanel: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeNotificationPanel: (state) => {
            state.isOpen = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const {
    setNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    toggleNotificationPanel,
    closeNotificationPanel,
    setLoading,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
