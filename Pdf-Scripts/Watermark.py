from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io, sys

def Watermark(inputFile, outputFile, text):
    try:
        packet = io.BytesIO()
        reader = PdfReader(inputFile)
        first_page = reader.pages[0]
        w = float(first_page.mediabox.width)
        h = float(first_page.mediabox.height)

        c = canvas.Canvas(packet, pagesize=(w,h))
        c.setFont("Helvetica-Bold", 50)
        c.setFillGray(0.8)
        c.saveState()
        c.translate(w/2, h/2)
        c.rotate(45)
        c.drawCentredString(0, 0, text)
        c.restoreState()
        c.save()

        packet.seek(0)
        watermark_pdf = PdfReader(packet)
        watermark_page = watermark_pdf.pages[0]

        
        writer = PdfWriter()

        for page in reader.pages:
            page.merge_page(watermark_page)
            writer.add_page(page)

        with open(outputFile, "wb") as f:
            writer.write(f)

    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    inputFile = sys.argv[1]
    outputFile = sys.argv[2]
    text = sys.argv[3]
    Watermark(inputFile, outputFile, text)
