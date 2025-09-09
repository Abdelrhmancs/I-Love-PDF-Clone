import axios from "axios";
import { useState, useRef } from "react";

const Watermark = () => {
  const [file, setFile] = useState();
  const [okGetFile, setOkGetFile] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [success, setSuccess] = useState(false);
  const FileRef = useRef(null);

  const handelRef = () => {
    FileRef.current.click();
  };

  const handelchange = (event) => {
    setFile(event.target.files[0]);
    setOkGetFile(true);
  };

  const handelUploadFile = async (text) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("text", text);

    try {
      const response = await axios.post(
        "http://localhost:5147/api/Watermark/Watermark-Pdf",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );

      const Url = window.URL.createObjectURL(new Blob([response.data]));
      let a = document.createElement("a");
      a.href = Url;
      a.setAttribute("download", "addWatermark_" + file.name);
      document.body.appendChild(a);
      a.click();
      a.remove();
      setSuccess(true);
    } catch (e) {
      alert(e.message);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col justify-center items-center p-3">
        <h1 className="font-bold text-[42px] mt-[200px] text-[#33333b]">
          Adding Watermark Successfully
        </h1>
      </div>
    );
  } else {
    if (!okGetFile) {
      return (
        <>
          <div className="flex flex-col justify-center items-center p-3 mt-6 ">
            <div className="flex flex-col justify-center items-center p-3  ">
              <h1 className="font-bold text-[42px] text-[#33333b]">
                Watermark
              </h1>
              <p className="text-[22px] text-gray-700">
                Stamp an image or text over your PDF in seconds. Choose the
                typography, transparency and position.
              </p>
            </div>
            <div className="mt-5 flex flex-col  justify-center items-center">
              <button
                onClick={handelRef}
                className=" mt-[45x] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] rounded-lg pt-[24px] pb-[24px] ps-[48px] pe-[48px]"
              >
                Select PDF files
              </button>
              <input
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handelchange}
                ref={FileRef}
              />
              <p className="text-gray-700 mt-1">or drop PDFs here</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col justify-center items-center p-3  ">
            <h1 className="font-bold text-[42px] text-[#33333b]">Watermark</h1>
            <p className="text-[22px] text-gray-700">
              Stamp an image or text over your PDF in seconds. Choose the
              typography, transparency and position.
            </p>
            <form className="flex flex-col text-center mt-[50px] items-center">
              <label
                className="text-[25px] font-bold text-[#33333b]"
                htmlFor=""
              >
                Write Watermark
              </label>
              <input
                className="mt-2 w-[470px] px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
                type="text"
                placeholder="Write Watermark"
                onChange={(e) => {
                  setValueInput(e.target.value);
                }}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handelUploadFile(valueInput);
                }}
                className="mt-8 bg-blue-600 w-[100px] text-white py-2  rounded-lg text-lg"
              >
                Download
              </button>
            </form>
          </div>
        </>
      );
    }
  }
};
export default Watermark;
