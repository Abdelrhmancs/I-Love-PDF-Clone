using Aspose.Words;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordToPdf : ControllerBase
    {

        [HttpPost("convert")]
        [Consumes("multipart/form-data")]
        [SwaggerOperation(
             Summary = "Convert Word(s) to a single PDF",
             Description = "Upload one or multiple Word files (.doc/.docx) and get a merged PDF."
         )]
        public async Task<IActionResult> ConvertToPdf([FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload at least one Word file.");

            try
            {
             
                var finalDoc = new Document();
                finalDoc.RemoveAllChildren();

                foreach (var file in files)
                {
                    using var fileStream = new MemoryStream();
                    await file.CopyToAsync(fileStream);
                    fileStream.Position = 0;

                    var doc = new Document(fileStream, new LoadOptions());

                    finalDoc.AppendDocument(doc, ImportFormatMode.KeepSourceFormatting);
                }

                using var outputStream = new MemoryStream();
                finalDoc.Save(outputStream, SaveFormat.Pdf);
                outputStream.Position = 0;

                return File(outputStream.ToArray(), "application/pdf", "Converted.pdf");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error converting files: {ex.Message}");
            }
        }
    }
}
