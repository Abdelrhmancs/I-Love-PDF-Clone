using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Pdf;
using PdfSharpCore.Pdf.IO;
namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfSplit : ControllerBase
    {
        [HttpPost("split")]
        public async Task<IActionResult> Split(IFormFile file , [FromForm] string selectPages)
        {
            
            if (ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(selectPages))
                {
                    return BadRequest("not page selected");
                }
                if (file != null || file.Length != 0)
                {
                    var pageList = selectPages.Split(',').Select(int.Parse).ToList();

                    var stream = file.OpenReadStream();
                    var oldDocument = PdfReader.Open(stream , PdfDocumentOpenMode.Import);
                    var newDocument = new PdfDocument();
                    foreach(var page in pageList)
                    {
                        if(page > 0  && page < oldDocument.PageCount)
                        {
                            newDocument.AddPage(oldDocument.Pages[page - 1]);
                        }
                    }

                    var ms = new MemoryStream();
                    newDocument.Save(ms, false);
                    return File(ms.ToArray(), "application/pdf", "split.pdf");
                }
                return BadRequest("please select file ");
            }
            return BadRequest(ModelState);
        }
    }
}
