from PyPDF2 import PdfReader , PdfWriter
import sys


def Protect(intputFile , outputFile , password):
    try:
        reader = PdfReader(intputFile)
        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)

        writer.encrypt(password)

        with open(outputFile , "wb") as f:
            writer.write(f)

    except Exception as e : 
        print("Error: ",e)             









if __name__ == "__main__":
    inputFile = sys.argv[1]
    outputFile = sys.argv[2]
    password = sys.argv[3]
    Protect(inputFile , outputFile ,password)