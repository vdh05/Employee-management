import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleGetMyAttendance, HandleInitializeAttendance, HandleUpdateAttendance } from "../../redux/Thunks/EmployeeMyDataThunk.js";
import { Loading } from "../../components/common/loading.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle2, Clock3, CircleSlash2, ListChecks } from "lucide-react";

export const MyAttendancePage = () => {
    const dispatch = useDispatch();
    const employeeState = useSelector((state) => state.employeereducer);
    const { myAttendance, isLoading, error } = useSelector((state) => state.employeeMyDataReducer);
    const employee = employeeState.data?.data || employeeState.data || null;
    const employeeID = employee?._id || "";

    const [selectedStatus, setSelectedStatus] = useState("Not Specified");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        dispatch(HandleGetMyAttendance());
    }, [dispatch]);

    useEffect(() => {
        if (myAttendance?.attendancelog?.length) {
            const todayLog = myAttendance.attendancelog.find((l) => l.logdate && new Date(l.logdate).toISOString().split("T")[0] === today);
            setSelectedStatus(todayLog?.logstatus ?? "Not Specified");
        }
    }, [myAttendance, today]);

    const handleInitialize = async () => {
        const payload = employeeID ? { employeeID } : {};
        const result = await dispatch(HandleInitializeAttendance(payload));
        if (!result.error) {
            dispatch(HandleGetMyAttendance());
        }
    };

    const handleUpdateToday = async () => {
        if (selectedDate < today) return;

        const payload = {
            status: selectedStatus,
            currentdate: selectedDate,
        };

        if (myAttendance?._id) {
            payload.attendanceID = myAttendance._id;
        }

        const result = await dispatch(HandleUpdateAttendance(payload));
        if (!result.error) {
            dispatch(HandleGetMyAttendance());
        }
    };

    if (isLoading && !myAttendance) return <Loading />;

    const logList = Array.isArray(myAttendance?.attendancelog) ? myAttendance.attendancelog : [];
    const presentCount = logList.filter((entry) => entry.logstatus === "Present").length;
    const absentCount = logList.filter((entry) => entry.logstatus === "Absent").length;
    const pendingCount = logList.filter((entry) => entry.logstatus === "Pending" || entry.logstatus === "Not Specified").length;

    return (
        <div className="mt-2 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white shadow-lg">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 min-[250px]:flex-col md:flex-row">
                        <div>
                            <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Attendance Tracking</p>
                            <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2">My Attendance</h1>
                            <p className="text-slate-200 mt-2 max-w-2xl">Log daily attendance and review your history in the same polished style as HR.</p>
                        </div>
                        <Badge className="bg-white/10 text-white border-white/20">{logList.length} entries</Badge>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><ListChecks className="w-4 h-4" /> Total</div>
                            <div className="text-2xl font-bold mt-1">{logList.length}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><CheckCircle2 className="w-4 h-4" /> Present</div>
                            <div className="text-2xl font-bold mt-1">{presentCount}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><CircleSlash2 className="w-4 h-4" /> Absent</div>
                            <div className="text-2xl font-bold mt-1">{absentCount}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><Clock3 className="w-4 h-4" /> Pending</div>
                            <div className="text-2xl font-bold mt-1">{pendingCount}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {error.status && <p className="text-red-600 text-sm">{error.message}</p>}

            {!myAttendance ? (
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-6 text-center">
                        <CalendarDays className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                        <p className="text-slate-700 mb-4">Attendance has not been initialized for you yet.</p>
                        <Button onClick={handleInitialize} disabled={isLoading} className="bg-blue-800 hover:bg-blue-900 text-white">
                            Initialize Attendance
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold mb-3 text-slate-900">Attendance Entry</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <label className="font-medium">Date:</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    min={today}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="border border-slate-300 rounded px-2 py-1"
                                />
                                <label className="font-medium">Status:</label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="border border-slate-300 rounded px-2 py-1"
                                >
                                    <option value="Not Specified">Not Specified</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                                <Button onClick={handleUpdateToday} disabled={isLoading} className="bg-blue-800 hover:bg-blue-900 text-white">
                                    Save Attendance
                                </Button>
                            </div>
                            {selectedDate < today && <p className="text-sm text-red-600 mt-2">Past date attendance cannot be added.</p>}
                        </CardContent>
                    </Card>

                    {logList.length === 0 && (
                        <Card className="border-slate-200 shadow-sm">
                            <CardContent className="p-6 text-center">
                                <p className="text-slate-700 mb-4">No attendance logs yet.</p>
                                <Button onClick={handleUpdateToday} disabled={isLoading} className="bg-blue-800 hover:bg-blue-900 text-white">
                                    Add Today&apos;s Attendance
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="border-slate-200 shadow-sm overflow-auto">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold mb-3 text-slate-900">Attendance log</h2>
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                <div className="grid grid-cols-3 gap-2 p-2 bg-blue-800 text-white font-bold text-sm">
                                    <span>Date</span>
                                    <span>Status</span>
                                    <span>Reason</span>
                                </div>
                                {logList.length === 0 ? (
                                    <p className="p-4 text-slate-600 text-center">No log entries yet.</p>
                                ) : (
                                    [...logList]
                                        .sort((a, b) => new Date(b.logdate) - new Date(a.logdate))
                                        .map((entry, idx) => (
                                            <div key={idx} className="grid grid-cols-3 gap-2 p-2 border-b border-slate-200">
                                                <span className="font-medium">{entry.logdate ? new Date(entry.logdate).toLocaleDateString() : "—"}</span>
                                                <span className={entry.logstatus === "Present" ? "text-green-700" : entry.logstatus === "Absent" ? "text-red-700" : entry.logstatus === "Pending" ? "text-yellow-700" : "text-gray-700"}>
                                                    {entry.logstatus || "—"}
                                                </span>
                                                <span>{entry.logreason || "—"}</span>
                                            </div>
                                        ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
};
