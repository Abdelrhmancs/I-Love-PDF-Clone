import { useState } from "react";
import axios from "axios";

const Pdf_to_word = () => {
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file); 

    try {
      const response = await axios.post(
        "http://localhost:5147/api/PdfToWord/convert-pdf-to-word",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob", 
        }
      );


      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Converted.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess(true);
    } catch (error) {
      alert("Error converting file:", error);
    }
  };

  return (
    <>
      {!success ? (
        <div className="flex flex-col justify-center items-center p-3 mt-6">
          <div className="flex flex-col justify-center items-center p-3">
            <h1 className="font-bold text-[42px] text-[#33333b]">
              PDF to WORD Converter
            </h1>
            <p className="text-[22px] text-gray-700">
              Convert your PDF to WORD documents with incredible accuracy.
            </p>
          </div>
          <div className="mt-5 flex flex-col justify-center items-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={handleFileUpload}
              />
              <span className="mt-[45x] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] rounded-lg pt-[24px] pb-[24px] ps-[48px] pe-[48px] flex justify-center items-center">
                Select PDF files
              </span>
            </label>
            <p className="text-gray-700 mt-1">or drop PDFs here</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="font-bold text-[42px] mt-[200px] text-[#33333b]">
          PDF to WORD Successfully
          </h1>
        </div>
      )}
    </>
  );
};

export default Pdf_to_word;
