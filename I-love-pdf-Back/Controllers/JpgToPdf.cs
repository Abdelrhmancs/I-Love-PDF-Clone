using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;
using Microsoft.AspNetCore.Mvc;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JpgToPdf : ControllerBase
    {
        [HttpPost("images-to-pdf")]
        public IActionResult ImagesToPdf([FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload images.");

            using var document = new PdfDocument();

            foreach (var file in files)
            {
                using var ms = new MemoryStream();
                file.CopyTo(ms);
                ms.Position = 0;

                var image = XImage.FromStream(() => ms);
                var page = document.AddPage();
                page.Width = image.PointWidth;
                page.Height = image.PointHeight;

                using var gfx = XGraphics.FromPdfPage(page);
                gfx.DrawImage(image, 0, 0, page.Width, page.Height);
            }

            using var output = new MemoryStream();
            document.Save(output, false);

            return File(output.ToArray(), "application/pdf", "mergedImages.pdf");
        }
    }
}
