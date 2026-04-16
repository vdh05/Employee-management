import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Bell, X, Check, CheckCheck } from "lucide-react"
import { HandleGetNotifications, startNotificationPolling, stopNotificationPolling } from "../../redux/Thunks/NotificationThunk.js"
import { markAllAsRead, toggleNotificationPanel, closeNotificationPanel } from "../../redux/Slices/NotificationSlice.js"

export const NotificationBell = () => {
    const dispatch = useDispatch()
    const { items: notifications, unreadCount, isOpen } = useSelector((state) => state.notificationReducer)

    useEffect(() => {
        dispatch(startNotificationPolling())
        
        return () => {
            dispatch(stopNotificationPolling())
        }
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.notification-panel')) {
                dispatch(closeNotificationPanel())
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, dispatch])

    const handleToggle = () => {
        dispatch(toggleNotificationPanel())
    }

    const handleMarkAllRead = () => {
        dispatch(markAllAsRead())
    }

    const handleRefresh = () => {
        dispatch(HandleGetNotifications())
    }

    return (
        <div className="notification-wrapper relative">
            <button
                onClick={handleToggle}
                className="relative p-2 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-6 h-6 text-blue-700" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="notification-panel absolute right-0 top-12 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="notification-header flex items-center justify-between p-4 border-b bg-blue-50">
                        <h3 className="font-bold text-lg text-blue-900">Notifications</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleRefresh}
                                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                title="Refresh"
                            >
                                <Bell className="w-4 h-4 text-blue-700" />
                            </button>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllRead}
                                    className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                                    title="Mark all as read"
                                >
                                    <CheckCheck className="w-4 h-4 text-green-600" />
                                </button>
                            )}
                            <button
                                onClick={() => dispatch(closeNotificationPanel())}
                                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="notification-list max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.slice(0, 10).map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`notification-item p-4 border-b hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-2 h-2 mt-2 rounded-full ${!notification.isRead ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm text-gray-800">{notification.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.content}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`text-xs px-2 py-0.5 rounded ${notification.audience === "Department-Specific" ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                                                    {notification.audience === "Department-Specific" ? notification.department?.name : 'Personal'}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(notification.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="notification-footer p-3 border-t bg-gray-50 text-center">
                        <a href="/HR/dashboard/notices" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View All Notices
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
