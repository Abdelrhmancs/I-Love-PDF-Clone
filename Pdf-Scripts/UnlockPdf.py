from PyPDF2 import PdfReader , PdfWriter
import sys


def Unlock(intputFile , outputFile , password):
    try:
        reader = PdfReader(intputFile)
        if reader.is_encrypted:
            if not reader.decrypt(password):
                print("incorrect password")
                return

        writer = PdfWriter()

        for page in reader.pages:
            writer.add_page(page)

        with open(outputFile , "wb") as f:
            writer.write(f)            

    except Exception as e : 
        print("Error: ",e)             









if __name__ == "__main__":
    inputFile = sys.argv[1]
    outputFile = sys.argv[2]
    password = sys.argv[3]
    Unlock(inputFile , outputFile ,password)