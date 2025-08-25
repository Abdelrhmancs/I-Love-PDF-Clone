import "./App.css";
import Nav from "/src/components/Nav.jsx";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Operations from "./components/Operations";
import Merge from "./components/Content_Of_Operations/Merge";
import Split from "./components/Content_Of_Operations/Split";
import Compress from "./components/Content_Of_Operations/Compress";
import Word_to_pdf from "./components/Content_Of_Operations/Word_to_pdf";
import Pdf_to_word from "./components/Content_Of_Operations/Pdf_to_word";
import Pdf_to_excel from "./components/Content_Of_Operations/pdf_to_excel";
import Pdf_to_jpg from "./components/Content_Of_Operations/Pdf_to_jpg";
import Jpg_to_pdf from "./components/Content_Of_Operations/Jpg_to_pdf";
import Pdf_to_ppt from "./components/Content_Of_Operations/Pdf_to_ppt";
import Excel_to_pdf from "./components/Content_Of_Operations/Excel_to_pdf";
import Watermark from "./components/Content_Of_Operations/Wstermark";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const App = () => {
  return (
    <>
      <Routes>
        {/* all routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/merge" element={<Merge />} />
          <Route path="/split" element={<Split />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/wordtopdf" element={<Word_to_pdf />} />
          <Route path="/pdftoword" element={<Pdf_to_word />} />
          <Route path="/pdftoexcel" element={<Pdf_to_excel />} />
          <Route path="/pdftojpg" element={<Pdf_to_jpg />} />
          <Route path="/jpgtopdf" element={<Jpg_to_pdf />} />
          <Route path="/pdftoppt" element={<Pdf_to_ppt />} />
          <Route path="/exceltopdf" element={<Excel_to_pdf />} />
          <Route path="/watermark" element={<Watermark />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
