import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ListWrapper, HeadingBar, ListContainer, EmployeeSalaryListItems } from "../../components/common/Dashboard/ListDesigns"
import { HandleGetMySalary } from "../../redux/Thunks/EmployeeMyDataThunk.js"
import { Loading } from "../../components/common/loading.jsx"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircleDollarSign, ListChecks, Wallet } from "lucide-react"

const table_headings = ["Basic Pay", "Net Pay", "Due Date", "Status"]

export const MySalariesPage = () => {
    const dispatch = useDispatch()
    const { mySalary, isLoading, error } = useSelector((state) => state.employeeMyDataReducer)

    useEffect(() => {
        dispatch(HandleGetMySalary())
    }, [dispatch])

    const salaryStats = useMemo(() => {
        const total = mySalary?.length || 0
        const paid = mySalary?.filter((item) => item.status === "Paid").length || 0
        const delayed = mySalary?.filter((item) => item.status === "Delayed").length || 0
        return { total, paid, delayed }
    }, [mySalary])

    if (isLoading && !mySalary?.length) return <Loading />

    return (
        <div className="mt-2 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-4 h-[97%]">
            <Card className="overflow-hidden border-white/20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white shadow-lg">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 min-[250px]:flex-col md:flex-row">
                        <div>
                            <p className="text-blue-200 text-sm uppercase tracking-[0.25em]">Compensation</p>
                            <h1 className="min-[250px]:text-2xl md:text-4xl font-bold mt-2">My Salaries</h1>
                            <p className="text-slate-200 mt-2 max-w-2xl">Review your salary records in a card-based layout that matches the rest of the employee dashboard.</p>
                        </div>
                        <Badge className="bg-white/10 text-white border-white/20">{salaryStats.total} records</Badge>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><ListChecks className="w-4 h-4" /> Total</div>
                            <div className="text-2xl font-bold mt-1">{salaryStats.total}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><CircleDollarSign className="w-4 h-4" /> Paid</div>
                            <div className="text-2xl font-bold mt-1">{salaryStats.paid}</div>
                        </div>
                        <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                            <div className="flex items-center gap-2 text-blue-100 text-sm"><Wallet className="w-4 h-4" /> Delayed</div>
                            <div className="text-2xl font-bold mt-1">{salaryStats.delayed}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {error.status && <p className="text-red-600 text-sm">{error.message}</p>}
            <div className="flex flex-col gap-4 overflow-auto">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <ListWrapper>
                            <HeadingBar table_layout={"grid-cols-4"} table_headings={table_headings} />
                        </ListWrapper>
                        <ListContainer>
                            <EmployeeSalaryListItems list={mySalary} />
                        </ListContainer>
                        {(!mySalary || mySalary.length === 0) && !isLoading && (
                            <p className="text-slate-600 text-center py-4">No salary records found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
