import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AttendanceListItems } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetAllAttendance } from "../../../redux/Thunks/HRAttendanceThunk.js"
import { Loading } from "../../../components/common/loading.jsx"

export const HRAttendancePage = () => {
    const dispatch = useDispatch()
    const attendanceState = useSelector((state) => state.HRAttendanceReducer)
    const table_headings = ["Employee", "Department", "Date", "Status", "Reason", "Action"]

    useEffect(() => {
        dispatch(HandleGetAllAttendance())
    }, [dispatch])

    useEffect(() => {
        if (attendanceState.fetchData) {
            dispatch(HandleGetAllAttendance())
        }
    }, [attendanceState.fetchData, dispatch])

    if (attendanceState.isLoading && !attendanceState.data) {
        return <Loading />
    }

    return (
        <div className="attendance-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-3 h-[97%]">
            <div className="attendance-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">Attendances</h1>
                <p className="text-sm text-gray-600">View and manage attendance records.</p>
            </div>
            <div className="attendance-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <AttendanceListItems TargetedState={attendanceState} />
                </ListContainer>
            </div>
        </div>
    )
}
