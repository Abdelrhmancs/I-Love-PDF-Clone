import sys
import pikepdf 

def CompressPdf(inputFile , outputFile):
    file = pikepdf.open(inputFile)
    file.save(outputFile , optimize = True)
    file.close()



if __name__ == "__main__":
    inputPdf = sys.argv[1]
    outputPdf = sys.argv[2]
    CompressPdf(inputPdf , outputPdf)

