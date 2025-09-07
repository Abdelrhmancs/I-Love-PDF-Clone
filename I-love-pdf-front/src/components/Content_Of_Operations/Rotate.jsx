import axios from "axios";
import { useState, useRef } from "react";

const Rotate = () => {
  const [file, setFile] = useState();
  const [okGetFile, setOkGetFile] = useState(false);
  const [success, setSuccess] = useState(false);
  const FileRef = useRef(null);

  const handelRef = () => {
    FileRef.current.click();
  };

  const handelChanges = (e) => {
    setFile(e.target.files[0]);
    setOkGetFile(true);
  };

  const handelUploadFile = async (degrees) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("degrees", degrees);

    try {
      const response = await axios.post(
        "http://localhost:5147/api/Rotate/rotate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );
      let url = URL.createObjectURL(new Blob([response.data]));
      let a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", "rotated_" + file.name);
      document.body.appendChild(a);
      a.click();
      a.remove();
      setSuccess(true);
    } catch (error) {
      alert(error.message);
    }
  };
  if (success) {
    return (
      <div className="flex flex-col justify-center items-center p-3">
        <h1 className="font-bold text-[42px] mt-[200px] text-[#33333b]">
          File Rotated Successfully
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
                Rotate PDF
              </h1>
              <p className="text-[22px] text-gray-700">
                Rotate your PDFs the way you need them. You can even rotate
                multiple PDFs at once!
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
                onChange={handelChanges}
                style={{ display: "none" }}
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
          <div className="flex  justify-center items-center p-3 mt-[220px] ">
            <button
              onClick={() => handelUploadFile(90)}
              className=" w-[200px] me-[40px] bg-[#e5322d] rounded-lg p-2 text-[15px] text-xl text-white hover:bg-[#a12f2b] transtion duration-300"
            >
              Rotate 90 degree
            </button>
            <button
              onClick={() => handelUploadFile(180)}
              className="w-[200px] me-[40px] bg-[#e5322d] rounded-lg p-2 text-[15px] text-xl text-white hover:bg-[#a12f2b] transtion duration-300"
            >
              Rotate 180 degree
            </button>
            <button
              onClick={() => handelUploadFile(270)}
              className="w-[200px] me-[40px] bg-[#e5322d] rounded-lg p-2 text-[15px] text-xl text-white hover:bg-[#a12f2b] transtion duration-300"
            >
              Rotate 270 degree
            </button>
          </div>
        </>
      );
    }
  }
};
export default Rotate;
