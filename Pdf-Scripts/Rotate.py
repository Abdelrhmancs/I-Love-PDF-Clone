from PyPDF2 import PdfReader , PdfWriter
import sys

def  Rotate(inputFile , outputFile  , rotation):
    
    try:
        reader = PdfReader(inputFile)
        writer = PdfWriter()
        for page in reader.pages:
            page.rotate(rotation)  
            writer.add_page(page)

        with open(outputFile, "wb") as f:
            writer.write(f)

    except Exception as e :
        print("error",e)
 
    





if __name__ == "__main__":
    inputFile =  sys.argv[1]
    outputFile =  sys.argv[2]
    rotation = int(sys.argv[3])
    Rotate(inputFile , outputFile , rotation)