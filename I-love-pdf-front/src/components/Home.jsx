import Title from "./Title";
import Card from './Card'
import pdf_icon from '../assets/pdf.png'
import Word_icon from '../assets/word.png'
import compress_pdf from '../assets/download-pdf.png'
import excel_icon from '../assets/excel.png'
import split_icon from '../assets/square.png'
import jpg_icon from '../assets/jpg.png'
import w_to_pdf from '../assets/word (1).png'
import jpg_to_pdf from '../assets/jpg-file.png'
import pdf_to_ppt from '../assets/ppt.png'
import excel_to_pdf from '../assets/xls-file.png'
import wotermark from '../assets/watermark.png'
import page_number from '../assets/page.png'
import rotate from '../assets/circular-arrows.png'
import protect from '../assets/shield.png'
import unlock from '../assets/unlocked.png' 
const Home = () => {
  
  return (
    <>
      <div>
        <Title />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   justify-items-center ps-[30px] pe-[30px]">
      <Card 
      icon={pdf_icon}
      title = "Merge PDF" 
      text="Combine PDFs in the order you want with the easiest PDF merger available."
      route={'/merge'}
        />
      <Card 
      icon={split_icon}
      title = "Split PDF" 
      text="Separate one page or a whole set for easy conversion into independent PDF files."
      route={'/split'}
        />
      <Card 
      icon={compress_pdf}
      title = "Compress PDF" 
      text="Reduce file size while optimizing for maximal PDF quality."
      route={'/compress'}
        />
      <Card 
      icon={Word_icon}
      title = "PDF to Word" 
      text="Combine PDFs in the order you want with the easiest PDF merger available."
      route={'/pdftoword'}
        />
      <Card 
      icon={w_to_pdf}
      title = "Word to PDF" 
      text="Make DOC and DOCX files easy to read by converting them to PDF."
      route={'/wordtopdf'}
        />
      <Card 
      icon={excel_icon}
      title = "PDF to Excel" 
      text="Pull data straight from PDFs into Excel spreadsheets in a few short seconds."
      route={'/pdftoexcel'}
        />
      <Card 
      icon={jpg_icon}
      title = "PDF to JPG" 
      text="Convert each PDF page into a JPG or extract all images contained in a PDF."
      route={'/pdftojpg'}
        />
      <Card 
      icon={jpg_to_pdf}
      title = "JPG to PDF" 
      text="Convert JPG images to PDF in seconds. Easily adjust orientation and margins."
      route={'/jpgtopdf'}
        />
      <Card 
      icon={pdf_to_ppt}
      title = "PDF to PPT" 
      text="Convert PDF to PPT images in seconds. Easily adjust orientation and margins."
      route={'/pdftoppt'}
        />
      <Card 
      icon={excel_to_pdf}
      title = "Excel to PDF" 
      text="CMake EXCEL spreadsheets easy to read by converting them to PDF."
      route={'/exceltopdf'}
        />
      <Card 
      icon={wotermark}
      title = "Watermark" 
      text="Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position."
      route={'/watermark'}
        />
      <Card 
      icon={page_number}
      title = "Page numbers" 
      text="Add page numbers into PDFs with ease. Choose your positions, dimensions, typography."
        />
      <Card 
      icon={rotate}
      title = "Rotate PDF" 
      text="Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!"
        />
      <Card 
      icon={protect}
      title = "Protect PDF" 
      text="Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access."
        />
      <Card 
      icon={unlock}
      title = "Unlock PDF" 
      text="Remove PDF password security, giving you the freedom to use your PDFs as you want."
        />
      </div>
    </>
  );
};
export default Home;
