import { useState, useRef } from "react";
import { Page, Document } from "react-pdf";
const Split = () => {
  // hooks
  const [usesfile, getFile] = useState(false);
  const [file, setFile] = useState([]);
  const [numpage, setNumPage] = useState(0);
  const getFielRef = useRef(null);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    getFile(true);
  };

  const handelgetNumPages = ({ numpages }) => {
    setNumPage(numpages);
     
  };

  const handelgetFileRef = () => {
    getFielRef.current.click()

  };



  if (!usesfile) {
    return (
      <div className="flex flex-col justify-center items-center p-3 mt-6 ">
        <div className="flex flex-col justify-center items-center p-3  ">
          <h1 className="font-bold text-[42px] text-[#33333b]">
            Split PDF file
          </h1>
          <p className="text-[22px] text-gray-700">
            Separate one page or a whole set for easy conversion into
            independent PDF files.
          </p>
        </div>
        <div className="mt-5 flex flex-col  justify-center items-center">
          <button
            onClick={handelgetFileRef}
            className=" mt-[45x] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] rounded-lg pt-[24px] pb-[24px] ps-[48px] pe-[48px]"
          >
            Select PDF files
          </button>
          <p className="text-gray-700 mt-1">or drop PDFs here</p>
        </div>
        <input
            type="file"
            accept="application/pdf"
            style={{ display: "none" }}
            ref={getFielRef}
            onChange={handleChange}
          />
      </div>
    );
  } else {
    return (
      <>
        <Document file={URL.createObjectURL(file)}  onLoadSuccess={handelgetNumPages}>
          {Array.from(new Array(numpage), (el, index) => (
            <div key={index} className="my-4 shadow-lg">
              <Page pageNumber={index + 1} />
              <p className="text-center mt-2">Page {index + 1}</p>
            </div>
          ))}
        </Document>
      </>
    );
  }
};
export default Split;
