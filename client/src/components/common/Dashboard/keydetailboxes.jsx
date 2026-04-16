export const KeyDetailsBox = ({image, dataname, data}) => {
    return (
        <div className="keydetail-box-container w-full">
            <div className="keydetails-content m-2 flex border-2 items-center justify-between border-[#3635ff] rounded-lg 2xl:p-4 sm:p-2 lg:p-3 min-[250px]:p-2">
                <div className="data-name-group flex flex-col min-[250px]:p-4 sm:p-2 2xl:gap-2 md:gap-1">
                    <div className="data">
                        <p className="min-[250px]:text-4xl sm:text-2xl lg:2xl xl:text-5xl font-bold">{data}</p>
                    </div>
                    <div className="dataname">
                        <p className="min-[250px]:text-xl sm:text-sm lg:text-md 2xl:text-xl font-bold text-gray-600">{dataname}</p>
                    </div>
                </div>
                <div className="data-image">
                    <img src={image} alt="Employees" className="min-[250px]:max-w-[50px] sm:max-w-[40px] md:max-w-[40px] lg:max-w-[40px] xl:max-w-[70px]"/>
                </div>
            </div>
        </div>
    )
}

export const KeyDetailBoxes = ({ title, count, bg, onClick }) => {
    return (
        <div 
            className={`keydetail-box-container w-full cursor-pointer ${bg} rounded-lg p-4 flex flex-col items-center justify-center min-[250px]:min-w-[100px] sm:min-w-[150px] lg:min-w-[200px]`}
            onClick={onClick}
        >
            <p className="text-white text-2xl font-bold">{count}</p>
            <p className="text-white text-sm sm:text-base lg:text-lg font-semibold mt-1">{title}</p>
        </div>
    )
}