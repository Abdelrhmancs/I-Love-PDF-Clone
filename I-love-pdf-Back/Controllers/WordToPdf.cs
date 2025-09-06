using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordToPdf : ControllerBase
    {

        [HttpPost("convert-word-to-pdf")]
        public async Task<IActionResult> ConvertToPdf([FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload at least one Word file.");

            var file = files.First();
            var pythonScript = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts";

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(),"uploadFiles");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var inputFile = Path.Combine(uploadFolder, file.FileName);
            var outputFile = Path.Combine(uploadFolder, "topdf"+ Path.GetFileNameWithoutExtension(file.FileName)+".pdf");

            var stream = new FileStream(inputFile, FileMode.Create);
            await file.CopyToAsync(stream);
            stream.Close();

            //script
            var filepath = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts\WordToPdf.py";
            var psi = new ProcessStartInfo
            {
                FileName = "Python",
                Arguments = $"\"{filepath}\" \"{inputFile}\" \"{outputFile}\"",
                WorkingDirectory = pythonScript,
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using(var process= Process.Start(psi))
            {
                await process.WaitForExitAsync();
                var error = process.StandardError.ReadToEnd();
                if(process.ExitCode != 0)
                {
                    return StatusCode(500, "faild :" + error);
                }

            }
            var fileBytes = await System.IO.File.ReadAllBytesAsync(outputFile);
            return File(fileBytes, "application/pdf", Path.GetFileNameWithoutExtension(file.FileName) + ".pdf");

        }
    }
}
