import registerImage from "../assets/register-image.png";
import logo from "../assets/ilovepdf.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = () => {
    const navigate = useNavigate()
    const [DataForm, SetDataForm] = useState({
    Email: "",
    Password: "",
  });

  const [ErrorMessage , SetErrorMessage] = useState()

  const handelchange = (e) => {
    SetDataForm({
      ...DataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!DataForm.Email || !DataForm.Password) {
        SetErrorMessage("Please fill all fields.");
        return;
      }
    SetErrorMessage("")
    try{
        const res = await axios.post("http://localhost:5147/api/Account/login", DataForm)
        if(res.status === 200 || res.status === 201){
            const token = res.data.token
            localStorage.setItem("JWT" , token)
            console.log("success +++++++ : token : "+ token)
            navigate('/')
        }else  {
            SetErrorMessage("Invalid email or password.")
        }
    }catch(err){
        SetErrorMessage(err.response?.data?.message || "Invalid email or password.");
    }
  }
  return (
    <>
      <div className="flex ">
        <div className="bg-white w-[60%] h-[100vh] flex  justify-center">
          <div className="flex items-center flex-col mt-[100px] ">
            <img className="w-40 p-3 " src={logo} alt="" />
            <h1 className="text-[28px] font-semibold  text-gray-700">
              Create new account
            </h1>
            <form onSubmit={handleSubmit} action="" className="flex flex-col mt-3">
              <input
                className="mt-2 w-[470px] px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
                type="Email"
                name="Email"
                placeholder="Email"
                onChange={handelchange}
              />
              <input
                className="mt-2 w-[470px] px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
                type="Password"
                name="Password"
                placeholder="Password"
                onChange={handelchange} 
              />
              <button
                className=" mt-3 bg-[#e5322d] rounded-lg p-2 text-[15px] text-white hover:bg-[#a12f2b] transtion duration-300"
                type="submit"
              >
                Log in
              </button>
            </form>
            {ErrorMessage && (
              <p className="mt-3 text-red-500 text-[16px]">{ErrorMessage}</p>
            )}
            <p className="text-[18px] mt-3 underline cursor-pointer text-[#a12f2b]">
              Forgot your password?
            </p>
            <p className="text-gray-500 mt-3 text-[18px]">
              Don't have an account?{" "}
              <span>
                <a
                  className="underline cursor-pointer text-[#a12f2b]"
                  onClick={() => navigate("/register")}
                >
                  Create an account
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className="w-[40%] ">
          <div className="block pt-[48px] ps-[48px] pe-[60px] ">
            <img className="mb-[32px]" src={registerImage} alt="" />
            <h1 className="text-[28px] font-semibold  text-gray-700">
              Log in to your workspace
            </h1>
            <p className="mt-2 text-[16px] leading-[30px]  text-gray-700">
              Enter your email and password to access your iLovePDF account. You
              are one step closer to boosting your document productivity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
