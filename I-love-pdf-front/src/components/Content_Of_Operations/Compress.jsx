import { useState , useRef } from "react";
import axios from "axios";
const Compress = () => {

    const [file , setFile] = useState(null)
    const [success , setSuccess] = useState(false)
    const FileInputRef = useRef()



    const handelRef = () => {
        FileInputRef.current.click()
    }

   
    const uploadFile = async(e) => {
        setFile(e.target.files[0])
        try {
            const formData = new FormData()
            formData.append("files" , file)
            const response = await axios.post("http://localhost:5147/api/Compress/Cpmress-Pdf", formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    responseType: "blob"
                }
            )
            let url = URL.createObjectURL(new Blob([response.data]))
            let a = document.createElement("a")
            a.href = url
            a.setAttribute("download" , "compressed"+ file.name)
            document.body.appendChild(a)
            a.click()
            a.remove()
            setSuccess(true)
        }catch(error){
            alert("errors  "+ error)
        }
    }
  
if(!success){
    return (
        <>
          <div className="flex flex-col justify-center items-center p-3 mt-6 ">
            <div className="flex flex-col justify-center items-center p-3  ">
              <h1 className="font-bold text-[42px] text-[#33333b]">Compress PDF files</h1>
              <p className="text-[22px] text-gray-700">Reduce file size while optimizing for maximal PDF quality.</p>
            </div>
            <div className="mt-5 flex flex-col  justify-center items-center">
              <button onClick={ handelRef} className=" mt-[45x] text-[24px] w-[330px] h-[80px] text-[#eee] font-semibold bg-[#e5322d] rounded-lg pt-[24px] pb-[24px] ps-[48px] pe-[48px]">
                Select PDF files
              </button>
              <p className="text-gray-700 mt-1">or drop PDFs here</p>
            </div>
            <input 
            type="file"
            accept="application/pdf"
            style={{display : "none"}}
            onChange={uploadFile}
            ref={FileInputRef}
            />
          </div>
        </>
      )
}else {
    return(
        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="font-bold text-[42px] mt-[200px] text-[#33333b]">
          File Compressed Successfully
          </h1>
        </div>
    )
}
}

export default Compress
