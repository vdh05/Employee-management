import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleGetMyLeaves, HandleCreateLeave } from "../../redux/Thunks/EmployeeMyDataThunk.js";
import { Loading } from "../../components/common/loading.jsx";
import { Button } from "@/components/ui/button";

export const MyLeaveLogPage = () => {
    const dispatch = useDispatch();
    const employeeState = useSelector((state) => state.employeereducer);
    const { myLeaves, isLoading, error } = useSelector((state) => state.employeeMyDataReducer);
    const employeeID = employeeState.data?._id || employeeState.data?.data?._id;

    const [form, setForm] = useState({
        title: "",
        startdate: "",
        enddate: "",
        reason: ""
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (employeeID) dispatch(HandleGetMyLeaves());
    }, [dispatch, employeeID]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddLeave = (e) => {
        e.preventDefault();
        if (!form.title || !form.startdate || !form.enddate || !form.reason) return;
        dispatch(HandleCreateLeave({ employeeID, ...form }));
        setForm({ title: "", startdate: "", enddate: "", reason: "" });
        setShowForm(false);
    };

    return (
        <div className="mt-2 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">My Leave Log</h1>
            {error.status && <p className="text-red-600 text-sm">{error.message}</p>}

            <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6 text-center">
                <Button onClick={() => setShowForm((v) => !v)} className="bg-blue-800 hover:bg-blue-900 text-white mb-4">
                    {showForm ? "Cancel" : "Add Leave Request"}
                </Button>
                {showForm && (
                    <form onSubmit={handleAddLeave} className="flex flex-col gap-3 items-center mb-4">
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border-2 border-gray-700 rounded px-2 py-1 w-64" required />
                        <input name="startdate" type="date" value={form.startdate} onChange={handleChange} className="border-2 border-gray-700 rounded px-2 py-1 w-64" required />
                        <input name="enddate" type="date" value={form.enddate} onChange={handleChange} className="border-2 border-gray-700 rounded px-2 py-1 w-64" required />
                        <textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" className="border-2 border-gray-700 rounded px-2 py-1 w-64" required />
                        <Button type="submit" className="bg-blue-800 hover:bg-blue-900 text-white">Submit</Button>
                    </form>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4 overflow-auto">
                <h2 className="text-lg font-semibold mb-3 text-gray-900">Leave Requests</h2>
                <div className="border-2 border-blue-700 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 bg-blue-800 text-white font-bold text-sm">
                        <span>Title</span>
                        <span>Start Date</span>
                        <span>End Date</span>
                        <span>Reason</span>
                        <span>Status</span>
                    </div>
                    {Array.isArray(myLeaves) && myLeaves.length > 0 ? (
                        [...myLeaves]
                            .sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
                            .map((entry, idx) => (
                                <div key={idx} className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 border-b border-gray-200">
                                    <span className="font-medium">{entry.title}</span>
                                    <span>{entry.startdate ? new Date(entry.startdate).toLocaleDateString() : "—"}</span>
                                    <span>{entry.enddate ? new Date(entry.enddate).toLocaleDateString() : "—"}</span>
                                    <span className="truncate max-w-[120px]">{entry.reason}</span>
                                    <span className={entry.status === "Approved" ? "text-green-700" : entry.status === "Rejected" ? "text-red-700" : "text-yellow-700"}>{entry.status || "Pending"}</span>
                                </div>
                            ))
                    ) : (
                        <p className="p-4 text-gray-600 text-center">No leave requests yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
