using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;
using PdfSharpCore.Drawing;
using System.IO;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageNumbers : ControllerBase
    {
        [HttpPost("add-page-numbers")]
        public IActionResult AddPageNumbers([FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload PDF files.");

            using var finalPdfStream = new MemoryStream();
            using var outputDocument = new PdfDocument();

            foreach (var file in files)
            {
                var ms = new MemoryStream();
                file.CopyTo(ms);
                ms.Position = 0;

                var inputDocument = PdfReader.Open(ms, PdfDocumentOpenMode.Import);

                for (int i = 0; i < inputDocument.PageCount; i++)
                {
                    var page = inputDocument.Pages[i];
                    var newPage = outputDocument.AddPage(page);

                    using (var gfx = XGraphics.FromPdfPage(newPage, XGraphicsPdfPageOptions.Prepend))
                    {
                        var font = new XFont("Arial", 14, XFontStyle.Bold);
                        string pageNumber = $"Page {i + 1} of {inputDocument.PageCount}";

                    
                        gfx.DrawString(
                            pageNumber,
                            font,
                            XBrushes.Black,
                            new XRect(0, page.Height - 30, page.Width - 20, 20),
                            XStringFormats.BottomRight
                        );
                    }
                }
            }

            outputDocument.Save(finalPdfStream, false);

            return File(finalPdfStream.ToArray(), "application/pdf", "page-numbered.pdf");
        }
    }
}
