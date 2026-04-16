
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandleGetMyLeaves } from "../../redux/Thunks/EmployeeMyDataThunk.js";
import { apiService } from "../../redux/apis/APIService";
import { APIsEndPoints } from "../../redux/apis/APIsEndpoints";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function EmployeeDashboardIndex() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const employeeState = useSelector((state) => state.employeereducer);
	const { myLeaves = [], isLoading } = useSelector((state) => state.employeeMyDataReducer);
	const employeeID = employeeState.data?.data?._id;

	// Notices
	const [notices, setNotices] = React.useState([]);
	React.useEffect(() => {
		async function fetchNotices() {
			try {
				const response = await apiService.get(APIsEndPoints.MY_NOTICES, { withCredentials: true });
				setNotices(response.data?.data || []);
			} catch {
				setNotices([]);
			}
		}
		fetchNotices();
	}, []);

	// Attendance
	const { myAttendance } = useSelector((state) => state.employeeMyDataReducer);
	const attendanceCount = Array.isArray(myAttendance?.attendancelog) ? myAttendance.attendancelog.length : 0;

	// Salary
	const { mySalary = [] } = useSelector((state) => state.employeeMyDataReducer);

	useEffect(() => {
		if (employeeID) dispatch(HandleGetMyLeaves());
		// Add dispatches for attendance and salary if needed
	}, [dispatch, employeeID]);

	// Calculate leave stats
	const totalLeaves = myLeaves.length;
	const approvedLeaves = myLeaves.filter((item) => item.status === "Approved").length;
	const pendingLeaves = myLeaves.filter((item) => item.status === "Pending").length;
	const rejectedLeaves = myLeaves.filter((item) => item.status === "Rejected").length;

	// Chart data
	const chartData = [
		{ name: "Leaves", Approved: approvedLeaves, Pending: pendingLeaves, Rejected: rejectedLeaves },
		{ name: "Notices", Total: notices.length },
		{ name: "Attendance", Days: attendanceCount },
		{ name: "Salary Records", Records: mySalary.length },
	];

	return (
		<div className="w-full min-h-full flex flex-col gap-6 p-2 pb-6">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardHeader><CardTitle>Total Leaves</CardTitle></CardHeader>
					<CardContent><div className="text-3xl font-bold">{totalLeaves}</div></CardContent>
				</Card>
				<Card>
					<CardHeader><CardTitle>Notices</CardTitle></CardHeader>
					<CardContent><div className="text-3xl font-bold">{notices.length}</div></CardContent>
				</Card>
				<Card>
					<CardHeader><CardTitle>Attendance Days</CardTitle></CardHeader>
					<CardContent><div className="text-3xl font-bold">{attendanceCount}</div></CardContent>
				</Card>
				<Card>
					<CardHeader><CardTitle>Salary Records</CardTitle></CardHeader>
					<CardContent><div className="text-3xl font-bold">{mySalary.length}</div></CardContent>
				</Card>
			</div>
			<div className="w-full min-h-[320px] h-[360px] md:h-[420px] bg-white rounded-lg shadow p-4">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
						<XAxis dataKey="name" />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Legend />
						<Bar dataKey="Approved" stackId="a" fill="#22c55e" />
						<Bar dataKey="Pending" stackId="a" fill="#eab308" />
						<Bar dataKey="Rejected" stackId="a" fill="#ef4444" />
						<Bar dataKey="Total" fill="#2563eb" />
						<Bar dataKey="Days" fill="#0ea5e9" />
						<Bar dataKey="Records" fill="#a21caf" />
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<Card className="flex-1 min-w-[200px]">
					<CardHeader>
						<CardTitle>My Leaves</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-row gap-4 justify-between items-center">
						<div>
							<div className="text-3xl font-bold">{totalLeaves}</div>
							<div className="text-sm text-gray-500">Total</div>
						</div>
						<div>
							<div className="text-xl text-green-700 font-bold">{approvedLeaves}</div>
							<div className="text-xs text-gray-500">Approved</div>
						</div>
						<div>
							<div className="text-xl text-yellow-700 font-bold">{pendingLeaves}</div>
							<div className="text-xs text-gray-500">Pending</div>
						</div>
						<div>
							<div className="text-xl text-red-700 font-bold">{rejectedLeaves}</div>
							<div className="text-xs text-gray-500">Rejected</div>
						</div>
					</CardContent>
				</Card>
				<div className="flex items-center">
					<Button variant="default" onClick={() => navigate("/auth/employee/employee-dashboard-index/leaves")}>View & Edit My Leaves</Button>
				</div>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Recent Leave Requests</CardTitle>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<div className="text-center py-8">Loading...</div>
						) : myLeaves.length === 0 ? (
							<div className="text-center py-8 text-gray-500">No leave requests yet.</div>
						) : (
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead>
										<tr className="bg-blue-50">
											<th className="p-2 text-left">Title</th>
											<th className="p-2 text-left">Start</th>
											<th className="p-2 text-left">End</th>
											<th className="p-2 text-left">Status</th>
										</tr>
									</thead>
									<tbody>
										{myLeaves.slice(0, 5).map((leave) => (
											<tr key={leave._id} className="border-b">
												<td className="p-2">{leave.title}</td>
												<td className="p-2">{leave.startdate ? new Date(leave.startdate).toLocaleDateString() : "—"}</td>
												<td className="p-2">{leave.enddate ? new Date(leave.enddate).toLocaleDateString() : "—"}</td>
												<td className="p-2">
													<span className={
														leave.status === "Approved"
															? "text-green-700"
															: leave.status === "Rejected"
															? "text-red-700"
															: "text-yellow-700"
													}>
														{leave.status}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
