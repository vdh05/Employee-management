export const HRInterviewInsightsPage = () => {
    return (
        <div className="interview-insights-container mt-5 min-[250px]:mx-1 sm:mx-2 w-auto flex flex-col gap-3 h-[97%]">
            <div className="interview-insights-heading flex justify-between items-center min-[250px]:flex-col min-[250px]:gap-2 min-[400px]:flex-row">
                <h1 className="min-[250px]:text-2xl md:text-4xl font-bold">Interview Insights</h1>
            </div>
            <div className="interview-insights-data flex flex-col gap-4 md:pe-5 overflow-auto flex-1">
                <div className="wrapper-container p-2 border-2 border-blue-700 rounded-lg w-auto flex-1 flex items-center justify-center min-h-[200px]">
                    <p className="text-gray-600 text-lg">Interview Insights — content coming soon.</p>
                </div>
            </div>
        </div>
    )
}
