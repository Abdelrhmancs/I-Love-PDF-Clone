import sys # to get file from cmd
import subprocess # to run qpdf 

def CompressPdf(inputFile , outputFile):
    command = [
        "qpdf",
        "--linearize",
        "--compress-streams=y",
        "--object-streams=generate",
        inputFile, 
        outputFile
    ]
    try:
        subprocess.run(command , check= True)
        print(f"successfully compress")
    except subprocess.CalledProcessError as e : 
        print("change name file without spaces or arabic char ", e)    




if __name__ == "__main__":
    inputFile = sys.argv[1]
    outputFile = sys.argv[2]
    CompressPdf(inputFile , outputFile)
