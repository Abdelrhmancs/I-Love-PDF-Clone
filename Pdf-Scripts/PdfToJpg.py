import fitz 
import os
import sys

def pdf_to_jpg(pdf_path, out_dir='output_images', zoom=2):
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    mat = fitz.Matrix(zoom, zoom) 
    saved_files = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        pix = page.get_pixmap(matrix=mat)
        out_path = os.path.join(out_dir, f'page_{page_num+1:03d}.jpg')
        pix.save(out_path)
        saved_files.append(out_path)

    doc.close()
    return saved_files

if __name__ == "__main__":
    pdf_file = sys.argv[1]
    out_dir = sys.argv[2]
    pdf_to_jpg(pdf_file, out_dir)