import { NotificationBell } from "../NotificationBell.jsx"

export const DashboardHeader = ({ title, children }) => {
    return (
        <div className="dashboard-header mb-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900">{title}</h1>
                <NotificationBell />
            </div>
            {children}
        </div>
    )
}
