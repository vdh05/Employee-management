import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { SalaryListItems } from "../../../components/common/Dashboard/ListDesigns"
import { AddSalaryDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetAllSalary } from "../../../redux/Thunks/HRSalaryThunk.js"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import { Loading } from "../../../components/common/loading.jsx"

export const HRSalariesPage = () => {
    const dispatch = useDispatch()
    const salaryState = useSelector((state) => state.HRSalaryReducer)
    const table_headings = ["Employee", "Basic Pay", "Net Pay", "Due Date", "Status", "Action"]

    useEffect(() => {
        dispatch(HandleGetAllSalary())
        dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))
    }, [dispatch])

    useEffect(() => {
        if (salaryState.fetchData) {
            dispatch(HandleGetAllSalary())
        }
    }, [salaryState.fetchData, dispatch])

    if (salaryState.isLoading && !salaryState.data) {
        return <Loading />
    }

    return (
        <div className="salaries-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-3 h-[97%]">
            <div className="salaries-heading flex justify-between items-center min-[250px]:flex-col min-[250px]:gap-2 min-[400px]:flex-row md:pe-5">
                <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">Salaries</h1>
                <AddSalaryDialogBox />
            </div>
            <div className="salaries-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-6"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    <SalaryListItems TargetedState={salaryState} />
                </ListContainer>
            </div>
        </div>
    )
}
