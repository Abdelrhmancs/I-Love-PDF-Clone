import registerImage from "../assets/register-image.png";
import logo from "../assets/ilovepdf.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [DataForm, SetDataForm] = useState({
    Name: "",
    Email: "",
    Password: ""
  });

  const [errors, setErrors] = useState({});

  const handelChange = (e) => {
    SetDataForm({
      ...DataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axios.post(
        "http://localhost:5147/api/Account/register",
        DataForm
      );
      if (res.status === 200 || res.status === 201) {
        navigate("/login");
      } else {
        setErrors({ general: res.data });
      }
    } catch (err) {
      if (err.response?.data && Array.isArray(err.response.data)) {
        const newErrors = {};
        err.response.data.forEach((error) => {
          if (error.code.includes("Password")) newErrors.Password = error.description;
          if (error.code.includes("Email")) newErrors.Email = error.description;
          if (error.code.includes("Name")) newErrors.Name = error.description;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: err.response?.data || "Something went wrong" });
      }
    }
  };

  return (
    <div className="flex">
      <div className="bg-white w-[60%] h-[100vh] flex justify-center">
        <div className="flex items-center flex-col mt-[100px]">
          <img className="w-40 p-3" src={logo} alt="" />
          <h1 className="text-[28px] font-semibold text-gray-700">
            Create new account
          </h1>
          {errors.general && (
            <p className="text-red-500 mt-2">{errors.general}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col mt-3">
            <input
              className="mt-2 w-[470px] px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
              type="text"
              name="Name"
              placeholder="Name"
              onChange={handelChange}
              value={DataForm.Name}
            />
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}

            <input
              className="mt-2 w-[470px] px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
              type="email"
              name="Email"
              placeholder="Email"
              onChange={handelChange}
              value={DataForm.Email}
            />
            {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}

            <input
              className="mt-2 w-[470px] px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
              type="password"
              name="Password"
              placeholder="Password"
              onChange={handelChange}
              value={DataForm.Password}
            />
            {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}

            <button
              className="mt-3 bg-[#e5322d] rounded-lg p-2 text-[15px] text-white hover:bg-[#a12f2b] transition duration-300"
              type="submit"
            >
              Sign up
            </button>
          </form>
          <p className="text-gray-500 mt-3">
            Already member?{" "}
            <span>
              <a
                className="underline cursor-pointer text-[#a12f2b]"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </span>
          </p>
        </div>
      </div>

      <div className="w-[40%]">
        <div className="block pt-[48px] ps-[48px] pe-[60px]">
          <img className="mb-[32px]" src={registerImage} alt="" />
          <h1 className="text-[28px] font-semibold text-gray-700">
            PDF tools for productive people
          </h1>
          <p className="mt-2 text-[16px] leading-[30px] text-gray-700">
            iLovePDF helps you convert, edit, e-sign, and protect PDF files
            quickly and easily. Enjoy a full suite of tools to effectively
            manage documents — no matter where you’re working.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
