import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { LeaveListItems } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetAllLeaves, HandleHRUpdateLeave } from "../../../redux/Thunks/HRLeaveThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { useToast } from "../../../hooks/use-toast.js"

export const HRLeavesPage = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const leaveState = useSelector((state) => state.HRLeaveReducer)
    const table_headings = ["Employee", "Title", "Start Date", "End Date", "Reason", "Status", "Action"]

    useEffect(() => {
        dispatch(HandleGetAllLeaves())
    }, [dispatch])

    useEffect(() => {
        if (leaveState.fetchData) {
            dispatch(HandleGetAllLeaves())
        }
    }, [leaveState.fetchData, dispatch])

    useEffect(() => {
        if (leaveState.error.status && leaveState.error.message) {
            toast({
                variant: "destructive",
                title: "Error",
                description: leaveState.error.message,
            })
        }
    }, [leaveState.error.status, leaveState.error.message])

    const handleApprove = (leaveID) => {
        dispatch(HandleHRUpdateLeave({ leaveID, status: "Approved" }))
        toast({
            title: "Success",
            description: "Leave approved",
        })
    }
    const handleReject = (leaveID) => {
        dispatch(HandleHRUpdateLeave({ leaveID, status: "Rejected" }))
        toast({
            title: "Success",
            description: "Leave rejected",
        })
    }

    if (leaveState.isLoading && !leaveState.data) {
        return <Loading />
    }

    return (
        <div className="leaves-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-3 h-[97%]">
            <div className="leaves-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">Leave Requests</h1>
                <p className="text-sm text-gray-600">Approve or reject employee leave requests below.</p>
            </div>
            <div className="leaves-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-7"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <LeaveListItems TargetedState={leaveState} onApprove={handleApprove} onReject={handleReject} />
                </ListContainer>
            </div>
        </div>
    )
}
