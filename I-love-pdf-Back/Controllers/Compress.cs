using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Compress : ControllerBase
    {
        [HttpPost("Cpmress-Pdf")]
        public async Task<IActionResult> CompressPdf(List<IFormFile> files)
        {
            if(files == null || files.Count == 0)
            {
                return BadRequest("upload pdf files");
            }
            var file = files.First();
            var pythonScript = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts";

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploadFiles");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);    
            }
            var inputPathFile = Path.Combine(uploadFolder, file.FileName);
            var outputPathFile = Path.Combine(uploadFolder, "Compress_"+file.FileName);

            var stream = new FileStream(inputPathFile , FileMode.Create);
            await file.CopyToAsync(stream);
            stream.Close();

            // script 
            var filepath = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts\Compress.py";
            var psi = new ProcessStartInfo
            {
                FileName = "Python",
                Arguments = $"\"{filepath}\" \"{inputPathFile}\" \"{outputPathFile}\"",
                WorkingDirectory = pythonScript,
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using(var process = Process.Start(psi))
            {
                await process.WaitForExitAsync();
                var error = process.StandardError.ReadToEnd();
                if(!string.IsNullOrEmpty(error))
                {
                    return StatusCode(500, "Compression failed: " + error);
                }
            }
            var fileBytes = await System.IO.File.ReadAllBytesAsync(outputPathFile);
           
            return File(fileBytes, "application/pdf", "compress_"+file.FileName);
            
        }
    }
}