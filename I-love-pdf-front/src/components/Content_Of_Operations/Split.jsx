import { useState, useRef   } from "react";
import { Page, Document, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
import axios from "axios";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const Split = () => {
  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true); 
  const fileInputRef = useRef(null);
  const [done , setDone] = useState(false)

  const toTop =() => {
    window.scroll({
        top:0,
        behavior: "smooth"
    })
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setHasFile(true);
      setLoadingPages(true); 
    }
  };

  const handleGetNumPages = ({ numPages }) => {
    setNumPages(numPages);
    setSelectedPages(Array.from({ length: numPages }, (_, i) => i + 1));
    setLoadingPages(false);
  };

  const handleGetFileRef = () => fileInputRef.current.click();

  const togglePage = (pageNumber) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((p) => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const handleSplit = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("selectPages", selectedPages.join(',')); 
  
    try {
      const res = await axios.post(
        "http://localhost:5147/api/PdfSplit/split",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob", // <<< لازم
        }
      );
  
   
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "split.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
      setDone(true) 
      toTop()
    } catch (err) {
      console.error(err);
      alert("Error splitting PDF");
    }
  };
  
 if(done){
    return(

        <>
    <div className="flex flex-col justify-center items-center p-3">
      <h1 className="font-bold text-[42px] mt-[200px] text-[#33333b]">
        split Successfully
      </h1>
    </div>
  </>
    )

 }else {
    if (!hasFile) {
        return (
          <div className="flex flex-col justify-center items-center p-8 mt-6">
            <h1 className="font-bold text-[42px] text-[#33333b]">Split PDF file</h1>
            <p className="text-[22px] text-gray-700">
              Separate pages and choose which ones to split.
            </p>
            <button
              onClick={handleGetFileRef}
              className="mt-[45px] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] transition duration-300 hover:bg-[#a12f2b]  rounded-lg"
            >
              Select PDF
            </button>
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </div>
        );
      } else  {
        return (
          <div className="p-8">
            <Document
              file={file}
              onLoadSuccess={handleGetNumPages}
              loading={<p className="text-center text-gray-500">Loading PDF...</p>}
            >
              {loadingPages ? (
                <p className="text-center text-gray-500">Loading pages...</p>
              ) : (
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                  {Array.from({ length: numPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    const isSelected = selectedPages.includes(pageNumber);
                    return (
                      <div
                        key={pageNumber}
                        className={`flex flex-col items-center p-2 border-4 rounded-lg cursor-pointer transition-all
                          ${isSelected ? "border-green-500 bg-green-100" : "border-gray-300 bg-white"}`}
                        onClick={() => togglePage(pageNumber)}
                      >
                        <Page
                          pageNumber={pageNumber}
                          width={150}
                          loading={<p className="text-gray-400 text-sm">Loading...</p>}
                        />
                        <p className="mt-2 text-gray-700 text-center">
                          Page {pageNumber}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </Document>
    
       <div className="flex justify-center items-center mt-6">
       <button
              onClick={handleSplit}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg text-xl"
            >
              Split Selected Pages
            </button>
       </div>
          </div>
        );
        
      }
    }
 }

export default Split;
