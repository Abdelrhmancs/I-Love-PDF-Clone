import sys
import os
import win32com.client as win32

def pdf_to_excel(input_pdf, output_excel):
    try:
        excel = win32.gencache.EnsureDispatch("Excel.Application")
        excel.Visible = False
        wb = excel.Workbooks.Open(os.path.abspath(input_pdf))
        wb.SaveAs(os.path.abspath(output_excel), FileFormat=51)

        wb.Close(False)
        excel.Quit()

    except Exception as e:
        print({e})

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    pdf_to_excel(input_file, output_file)
    