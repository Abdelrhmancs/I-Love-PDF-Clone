using Microsoft.AspNetCore.Mvc;
using Spire.Pdf;
using System.IO;
using System.Threading.Tasks;
namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfToWord : ControllerBase
    {

        [HttpPost("convert-to-word")]
        public async Task<IActionResult> ConvertToWord(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload at least one PDF file.");

            var file = files.First(); 

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            memoryStream.Position = 0;

            var pdf = new Spire.Pdf.PdfDocument();
            pdf.LoadFromStream(memoryStream);

            using var outputStream = new MemoryStream();
            pdf.SaveToStream(outputStream, Spire.Pdf.FileFormat.DOCX);
            outputStream.Position = 0;

            return File(
                outputStream.ToArray(),
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                Path.GetFileNameWithoutExtension(file.FileName) + ".docx"
            );
        }

    }
}
