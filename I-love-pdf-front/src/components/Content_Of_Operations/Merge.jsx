import axios from "axios";
import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

const Merge = () => {
  // hooks
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFiles([...files, newFile]);
    }
  };
  // drag and drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (e) => setFiles((prev) => [...prev, ...e]),
    accept: { "application/pdf": [] },
    multiple: false,
    noClick: true,
  });
  // handel Ref
  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  // request backend
  const uploadFile = async () => {
    if (files.length === 0) {
      alert("select at least one file");
      return;
    }

    let formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const res = await axios.post(
        "http://localhost:5147/api/PdfMerge/merge",
        formData,
        { responseType: "blob" }
      );

      if (res.status === 200 || res.status === 201) {
        let url = URL.createObjectURL(res.data);
        let a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      alert("error " + err);
    }
    setDone(true);
  };

  if (done) {
    return (
      <>
        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="font-bold text-[42px] mt-[200px] text-[#33333b]">
            Merged Successfully
          </h1>
        </div>
      </>
    );
  } else {
    return (
      <div
        {...getRootProps()}
        className={`${isDragActive ? "bg-zinc-400" : ""} h-[100%]`}
      >
        <div className={`flex flex-col justify-center items-center p-3  `}>
          {/* to get drop file  */}
          <input {...getInputProps()} />

          <div className="flex flex-col justify-center items-center p-3">
            <h1 className="font-bold text-[42px] text-[#33333b]">Merge PDF files</h1>
            <p className="text-[22px] text-gray-700">Combine PDFs in the order you want with the easiest PDF merger available.</p>
          </div>

          <div className="mt-5 flex flex-col justify-center items-center">
            <button
              onClick={handleAddClick}
              className="mt-[45px] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] transition duration-300 hover:bg-[#a12f2b]  rounded-lg"
            >
              Select PDF files
            </button>
            <p className="text-gray-700 mt-1">or drop PDFs here</p>
          </div>

          <input
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleChange}
          />
          <ul className="mt-[40px] w-[330px] ">
            {files.map((f, i) => {
              return (
                <li
                  key={i}
                  className=" mb-2 text-center font-semibold  bg-white rounded-md text-gray-700 p-3 "
                >
                  {f.name}
                </li>
              );
            })}
          </ul>

          {files.length != 0 && (
            <button
              onClick={uploadFile}
              className="mt-[45px] text-[13px]  w-[80px] h-[40px] text-[#eee] font-semibold bg-[#e5322d] rounded-lg"
            >
              Download
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Merge;
