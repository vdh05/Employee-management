import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListWrapper, HeadingBar, ListContainer, EmployeeLeaveListItems } from "../../components/common/Dashboard/ListDesigns";
import { EmployeeAddLeaveDialogBox } from "../../components/common/Dashboard/dialogboxes.jsx";
import { HandleGetMyLeaves } from "../../redux/Thunks/EmployeeMyDataThunk.js";
import { HandleGetEmployeeProfile } from "../../redux/Thunks/EmployeeThunk.js";
import { Loading } from "../../components/common/loading.jsx";
import { useToast } from "../../hooks/use-toast.js";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CircleCheckBig, CircleMinus, CircleX, ListChecks } from "lucide-react";

const table_headings = ["Title", "Start Date", "End Date", "Reason", "Status", "Action"];

export const MyLeavesPage = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const employeeState = useSelector((state) => state.employeereducer);
    const { myLeaves, isLoading, error } = useSelector((state) => state.employeeMyDataReducer);
    const employee = employeeState.data?.data || employeeState.data || null;
    const employeeID = employee?._id || "";

    // Fetch employee profile if not loaded
    useEffect(() => {
        if (!employeeState.data) {
            dispatch(HandleGetEmployeeProfile({ apiroute: "GET_PROFILE" }));
        }
    }, [dispatch, employeeState.data]);

    useEffect(() => {
        dispatch(HandleGetMyLeaves());
    }, [dispatch]);

    useEffect(() => {
        if (error.status && error.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    }, [error.status, error.message]);

    // Show error if employee profile fails to load
    if (!employeeID && employeeState.error && employeeState.error.message) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-600">
                <h2 className="text-xl font-bold">Failed to load employee profile</h2>
                <p>{employeeState.error.message}</p>
            </div>
        );
    }


    const hasLeaves = Array.isArray(myLeaves) && myLeaves.length > 0;
    const leaveStats = useMemo(() => {
        const total = myLeaves?.length || 0;
        const approved = myLeaves?.filter((item) => item.status === "Approved").length || 0;
        const pending = myLeaves?.filter((item) => item.status === "Pending").length || 0;
        const rejected = myLeaves?.filter((item) => item.status === "Rejected").length || 0;
        return { total, approved, pending, rejected };
    }, [myLeaves]);

    return (
        <div className="mt-2 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white shadow-lg">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 min-[250px]:flex-col md:flex-row">
                        <div>
                            <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Leave Management</p>
                            <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2">My Leaves</h1>
                            <p className="text-slate-200 mt-2 max-w-2xl">Track all leave requests and create new ones from a dashboard styled like HR.</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <Badge className="bg-white/10 text-white border-white/20">{leaveStats.total} total</Badge>
                            <EmployeeAddLeaveDialogBox employeeID={employeeID} />
                        </div>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><ListChecks className="w-4 h-4" /> Total</div>
                            <div className="text-2xl font-bold mt-1">{leaveStats.total}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><CircleCheckBig className="w-4 h-4" /> Approved</div>
                            <div className="text-2xl font-bold mt-1">{leaveStats.approved}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><CircleMinus className="w-4 h-4" /> Pending</div>
                            <div className="text-2xl font-bold mt-1">{leaveStats.pending}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><CircleX className="w-4 h-4" /> Rejected</div>
                            <div className="text-2xl font-bold mt-1">{leaveStats.rejected}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {error.status && <p className="text-red-600 text-sm">{error.message}</p>}
            <div className="flex flex-col gap-4 overflow-auto">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <ListWrapper>
                            <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                        </ListWrapper>
                        <ListContainer>
                            {hasLeaves ? (
                                <EmployeeLeaveListItems list={myLeaves} />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 w-full min-h-[180px] text-center">
                                    <CalendarDays className="w-10 h-10 text-blue-600 mb-3" />
                                    <div className="text-slate-700 text-lg font-semibold mb-2">You have not made any leave requests yet.</div>
                                    <EmployeeAddLeaveDialogBox employeeID={employeeID} />
                                    <div className="text-slate-500 text-sm mt-3">Use the button above to make your first leave request.</div>
                                </div>
                            )}
                        </ListContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
