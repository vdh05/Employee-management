import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetCorporateCalendarEvents, HandleCreateCorporateCalendarEvent, HandleUpdateCorporateCalendarEvent, HandleDeleteCorporateCalendarEvent } from "../../../redux/Thunks/CorporateCalendarThunk"
import { HandleGetHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk"
import { Loading } from "../../../components/common/loading.jsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Plus, Edit, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react"

const audienceOptions = ["All Employees", "Department-Specific", "Employee-Specific"]

export const HRCorporateCalendarPage = () => {
    const dispatch = useDispatch()
    const calendarState = useSelector((state) => state.corporateCalendarReducer)
    const departmentState = useSelector((state) => state.HRDepartmentPage)
    
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date())
    
    const [formData, setFormData] = useState({
        eventtitle: "",
        eventdate: "",
        description: "",
        audience: "All Employees",
        departmentID: ""
    })

    useEffect(() => {
        dispatch(HandleGetCorporateCalendarEvents())
        dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
    }, [])

    useEffect(() => {
        if (calendarState.fetchData) {
            dispatch(HandleGetCorporateCalendarEvents())
        }
    }, [calendarState.fetchData, dispatch])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCreateEvent = async () => {
        if (!formData.eventtitle || !formData.eventdate || !formData.description || !formData.audience) {
            return
        }
        await dispatch(HandleCreateCorporateCalendarEvent(formData))
        setIsCreateDialogOpen(false)
        setFormData({ eventtitle: "", eventdate: "", description: "", audience: "All Employees", departmentID: "" })
    }

    const handleUpdateEvent = async () => {
        if (!selectedEvent || !formData.eventtitle || !formData.eventdate || !formData.description || !formData.audience) {
            return
        }
        await dispatch(HandleUpdateCorporateCalendarEvent({ eventID: selectedEvent._id, updatedData: formData }))
        setIsEditDialogOpen(false)
        setSelectedEvent(null)
        setFormData({ eventtitle: "", eventdate: "", description: "", audience: "All Employees", departmentID: "" })
    }

    const handleDeleteEvent = async () => {
        if (!selectedEvent) return
        await dispatch(HandleDeleteCorporateCalendarEvent(selectedEvent._id))
        setIsDeleteDialogOpen(false)
        setSelectedEvent(null)
    }

    const openEditDialog = (event) => {
        setSelectedEvent(event)
        setFormData({
            eventtitle: event.eventtitle,
            eventdate: event.eventdate.split('T')[0],
            description: event.description,
            audience: event.audience,
            departmentID: event.departmentID || ""
        })
        setIsEditDialogOpen(true)
    }

    const openDeleteDialog = (event) => {
        setSelectedEvent(event)
        setIsDeleteDialogOpen(true)
    }

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()
        
        const days = []
        for (let i = 0; i < startingDay; i++) {
            days.push(null)
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i))
        }
        return days
    }

    const getEventsForDate = (date) => {
        if (!date) return []
        const dateStr = date.toLocaleDateString('en-CA')
        return calendarState.events.filter(event => {
            const eventDate = new Date(event.eventdate)
            const eventDateStr = eventDate.toLocaleDateString('en-CA')
            return eventDateStr === dateStr
        })
    }

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1))
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const days = getDaysInMonth(currentDate)

    if (calendarState.isLoading && !calendarState.events.length) {
        return <Loading />
    }

    return (
        <div className="calendar-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-3 h-[97%]">
            <div className="calendar-heading flex justify-between items-center min-[250px]:flex-col min-[250px]:gap-2 min-[400px]:flex-row">
                <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">Corporate Calendar</h1>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create Event
                </Button>
            </div>

            <div className="calendar-stats flex gap-4 flex-wrap">
                <div className="stat-card bg-blue-100 p-3 rounded-lg">
                    <span className="font-bold text-blue-800">{calendarState.events.length}</span>
                    <span className="text-blue-600 ml-2">Total Events</span>
                </div>
                <div className="stat-card bg-green-100 p-3 rounded-lg">
                    <span className="font-bold text-green-800">{calendarState.events.filter(e => e.audience === "All Employees").length}</span>
                    <span className="text-green-600 ml-2">All Employees</span>
                </div>
                <div className="stat-card bg-purple-100 p-3 rounded-lg">
                    <span className="font-bold text-purple-800">{calendarState.events.filter(e => e.audience !== "All Employees").length}</span>
                    <span className="text-purple-600 ml-2">Specific</span>
                </div>
            </div>

            <div className="calendar-wrapper flex-1 overflow-auto">
                <Card>
                    <CardContent className="p-4">
                        <div className="calendar-header flex justify-between items-center mb-4">
                            <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="calendar-grid">
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {dayNames.map(day => (
                                    <div key={day} className="text-center font-semibold text-gray-600 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, index) => {
                                    const events = getEventsForDate(day)
                                    const isToday = day && day.toDateString() === new Date().toDateString()
                                    return (
                                        <div 
                                            key={index} 
                                            className={`min-h-[80px] border rounded-lg p-1 ${day ? 'bg-white' : 'bg-gray-50'} ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                                        >
                                            {day && (
                                                <>
                                                    <div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                                                        {day.getDate()}
                                                    </div>
                                                    <div className="space-y-1 mt-1">
                                                        {events.slice(0, 2).map(event => (
                                                            <div 
                                                                key={event._id}
                                                                className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate cursor-pointer hover:bg-blue-200"
                                                                onClick={() => openEditDialog(event)}
                                                            >
                                                                {event.eventtitle}
                                                            </div>
                                                        ))}
                                                        {events.length > 2 && (
                                                            <div className="text-xs text-gray-500">+{events.length - 2} more</div>
                                                        )}
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

                <div className="events-list mt-4">
                    <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
                    <div className="grid gap-3">
                        {[...calendarState.events]
                            .sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate))
                            .slice(0, 5)
                            .map(event => (
                                <div key={event._id} className="flex justify-between items-center p-3 border rounded-lg bg-white hover:border-blue-400 transition-colors">
                                    <div>
                                        <h4 className="font-semibold">{event.eventtitle}</h4>
                                        <p className="text-sm text-gray-500">
                                            {new Date(event.eventdate).toLocaleDateString()} • {event.audience}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => openEditDialog(event)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600" onClick={() => openDeleteDialog(event)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        {calendarState.events.length === 0 && (
                            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-500">No events scheduled yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Event</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="eventtitle">Event Title</Label>
                            <Input
                                id="eventtitle"
                                name="eventtitle"
                                value={formData.eventtitle}
                                onChange={handleInputChange}
                                placeholder="Enter event title"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="eventdate">Event Date</Label>
                            <Input
                                id="eventdate"
                                name="eventdate"
                                type="date"
                                value={formData.eventdate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="audience">Audience</Label>
                            <select
                                id="audience"
                                name="audience"
                                value={formData.audience}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            >
                                {audienceOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        {formData.audience === "Department-Specific" && (
                            <div className="grid gap-2">
                                <Label htmlFor="departmentID">Department</Label>
                                <select
                                    id="departmentID"
                                    name="departmentID"
                                    value={formData.departmentID}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="">Select Department</option>
                                    {departmentState.data?.map(dept => (
                                        <option key={dept._id} value={dept._id}>{dept.departmentname}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter event description"
                                rows={3}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateEvent}>Create Event</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Event</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-eventtitle">Event Title</Label>
                            <Input
                                id="edit-eventtitle"
                                name="eventtitle"
                                value={formData.eventtitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-eventdate">Event Date</Label>
                            <Input
                                id="edit-eventdate"
                                name="eventdate"
                                type="date"
                                value={formData.eventdate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-audience">Audience</Label>
                            <select
                                id="edit-audience"
                                name="audience"
                                value={formData.audience}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            >
                                {audienceOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        {formData.audience === "Department-Specific" && (
                            <div className="grid gap-2">
                                <Label htmlFor="departmentID">Department</Label>
                                <select
                                    id="departmentID"
                                    name="departmentID"
                                    value={formData.departmentID}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                >
                                    <option value="">Select Department</option>
                                    {departmentState.data?.map(dept => (
                                        <option key={dept._id} value={dept._id}>{dept.departmentname}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <textarea
                                id="edit-description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdateEvent}>Update Event</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Event</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{selectedEvent?.eventtitle}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteEvent}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
