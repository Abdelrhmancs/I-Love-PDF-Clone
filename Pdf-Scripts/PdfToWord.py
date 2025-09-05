import sys 
from pdf2docx import Converter 

def PdfToWord(inputFile , outFile):

    try:
        cv = Converter(inputFile)
        cv.convert(outFile , start= 0, end=None)
        cv.close()
        print("success")

    except Exception as e :
        print("error "+e)    




if __name__ == "__main__":
    inputFile  = sys.argv[1]
    outputFile = sys.argv[2]
    PdfToWord(inputFile , outputFile)

