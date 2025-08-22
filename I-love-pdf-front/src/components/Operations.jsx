const Operations = ({title , description })=> {
    return(
        <>
            <div className="flex flex-col justify-center items-center p-3 mt-6 ">
               <div  className="flex flex-col justify-center items-center p-3  ">
               <h1 className="font-bold text-[42px] text-[#33333b]">{title}</h1>
               <p className="text-[22px] text-gray-700">{description}</p>
               </div>
                <div className="mt-5 flex flex-col  justify-center items-center">
                    <button className=" mt-[45x] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] rounded-lg pt-[24px] pb-[24px] ps-[48px] pe-[48px]">Select PDF files</button>
                    <p className="text-gray-700 mt-1">or drop PDFs here</p>
                </div>
            </div>
        </>
    )
}
export default Operations