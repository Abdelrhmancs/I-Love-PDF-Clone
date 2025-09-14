import sys
import os
import win32com.client as win32

def excel_to_pdf(input_excel, output_pdf):
    try:
        excel = win32.gencache.EnsureDispatch("Excel.Application")
        excel.Visible = False

        wb = excel.Workbooks.Open(os.path.abspath(input_excel))    
        wb.ExportAsFixedFormat(0, os.path.abspath(output_pdf))
        wb.Close(False)
        excel.Quit()
    except Exception as e:
        print(f"{e}")

if __name__ == "__main__":

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    excel_to_pdf(input_file, output_file)
    