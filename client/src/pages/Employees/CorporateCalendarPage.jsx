import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetEmployeeCalendarEvents } from "../../redux/Thunks/CorporateCalendarThunk"
import { Loading } from "../../components/common/loading.jsx"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, CalendarDays, ListChecks } from "lucide-react"

export const EmployeeCorporateCalendarPage = () => {
    const dispatch = useDispatch()
    const calendarState = useSelector((state) => state.corporateCalendarReducer)
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        dispatch(HandleGetEmployeeCalendarEvents())
    }, [dispatch])

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()

        const days = []
        for (let i = 0; i < startingDay; i++) days.push(null)
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))
        return days
    }

    const getEventsForDate = (date) => {
        if (!date) return []
        const dateStr = date.toLocaleDateString("en-CA")
        return calendarState.events.filter((event) => new Date(event.eventdate).toLocaleDateString("en-CA") === dateStr)
    }

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1))
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const days = getDaysInMonth(currentDate)
    const upcomingCount = calendarState.events.filter((event) => new Date(event.eventdate) >= new Date()).length

    if (calendarState.isLoading && !calendarState.events.length) {
        return <Loading />
    }

    return (
        <div className="calendar-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white shadow-lg">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 min-[250px]:flex-col md:flex-row">
                        <div>
                            <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Corporate Calendar</p>
                            <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2 flex items-center gap-2">
                                <Calendar className="w-8 h-8" /> Corporate Calendar
                            </h1>
                            <p className="text-slate-200 mt-2 max-w-2xl">Stay aligned with company events, announcements, and schedule changes.</p>
                        </div>
                        <Badge className="bg-white/10 text-white border-white/20">{calendarState.events.length} events</Badge>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm">
                                <ListChecks className="w-4 h-4" /> Total
                            </div>
                            <div className="text-2xl font-bold mt-1">{calendarState.events.length}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm">
                                <CalendarDays className="w-4 h-4" /> Upcoming
                            </div>
                            <div className="text-2xl font-bold mt-1">{upcomingCount}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="calendar-wrapper flex-1 overflow-auto">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="calendar-header flex justify-between items-center mb-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => changeMonth(-1)}>
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-slate-900">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => changeMonth(1)}>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="calendar-grid">
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {dayNames.map((day) => (
                                    <div key={day} className="text-center font-semibold text-gray-600 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, index) => {
                                    const events = getEventsForDate(day)
                                    const isToday = day && day.toDateString() === new Date().toDateString()
                                    const isPast = day && day.toDateString() < new Date().toDateString()

                                    return (
                                        <div
                                            key={index}
                                            className={`min-h-[80px] border rounded-lg p-1 ${day ? "bg-white" : "bg-gray-50"} ${isToday ? "border-blue-500 border-2" : "border-gray-200"} ${isPast ? "opacity-60" : ""}`}
                                        >
                                            {day && (
                                                <>
                                                    <div className={`text-sm font-semibold ${isToday ? "text-blue-600" : "text-gray-700"}`}>
                                                        {day.getDate()}
                                                    </div>
                                                    <div className="space-y-1 mt-1">
                                                        {events.slice(0, 2).map((event) => (
                                                            <div key={event._id} className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                                                                {event.eventtitle}
                                                            </div>
                                                        ))}
                                                        {events.length > 2 && <div className="text-xs text-gray-500">+{events.length - 2} more</div>}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm mt-4">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-3 text-slate-900">Upcoming Events</h3>
                        <div className="grid gap-3">
                            {[...calendarState.events]
                                .filter((event) => new Date(event.eventdate) >= new Date())
                                .sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
                                .slice(0, 5)
                                .map((event) => (
                                    <div key={event._id} className="flex justify-between items-center p-3 border rounded-lg bg-white hover:border-blue-400 transition-colors">
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{event.eventtitle}</h4>
                                            <p className="text-sm text-gray-500">
                                                {new Date(event.eventdate).toLocaleDateString()} • {event.audience}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                        </div>
                                    </div>
                                ))}
                            {calendarState.events.filter((event) => new Date(event.eventdate) >= new Date()).length === 0 && (
                                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                    <p className="text-gray-500">No upcoming events.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
