using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfMerge : ControllerBase
    {
        [HttpPost("merge")]
        public async Task<IActionResult> Merge(List<IFormFile> files)
        {
            if(files != null && files.Count != 0)
            {
                PdfDocument outFile = new PdfDocument();
                foreach(IFormFile file in files)
                {
                    var stream =  file.OpenReadStream();
                    PdfDocument inputFile = PdfReader.Open(stream , PdfDocumentOpenMode.Import);
                    foreach(var page in inputFile.Pages)
                    {
                        outFile.AddPage(page);
                    }
                }
                var ms = new MemoryStream();
                outFile.Save(ms, false);
                ms.Position = 0;
                return File(ms.ToArray(), "application/pdf", "merged.pdf");
            }
            return BadRequest("no psdf file uploaded");
        }
        
    }
}
