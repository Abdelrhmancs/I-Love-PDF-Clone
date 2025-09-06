import sys 
from docx2pdf import convert

def WordToPdf(inputFile , outputFile):
    try:
        convert(inputFile  , outputFile) 

    except Exception as e : 
        print("error  ",e)




if __name__ == "__main__":
    inputFile = sys.argv[1]
    outputFile = sys.argv[2]
    WordToPdf(inputFile , outputFile)

