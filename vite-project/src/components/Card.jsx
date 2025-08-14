import { useNavigate } from "react-router-dom";
const Card = ({ icon, title, text ,route }) => {
    const navigate = useNavigate()
  return (
    <>
      <div onClick = {()=> navigate(route)} className=" group mt-3 transtion duration-500 border hover:cursor-pointer hover:border-black bg-white rounded-xl shadow-md p-5 flex w-[240px] h-[240px] flex-col">
        <div className=" flex  rounded-lg ">
            <img src={icon} className="w-[50px] group-hover:ms-[65px] transtion duration-500" alt="" />
            </div>
        <div className="flex flex-col  "> 
          <h3 className="mt-4 w-full text-[22px] font-semibold text-[#33333b]">{title}</h3>
          <p className="mt-2 text-gray-700 text-[15px]">{text}</p>
        </div>
      </div>
    </>
  );
};
export default Card;
