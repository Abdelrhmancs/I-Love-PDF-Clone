using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelToPdf : ControllerBase
    {
        [HttpPost("convert-excel-to-pdf")]
        public async Task<IActionResult> ConvertToPdf(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload at least one Excel file.");

            var file = files.First();
            var pythonScript = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts";

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploadFiles");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var inputPathFile = Path.Combine(uploadFolder, file.FileName);
            var outputPathFile = Path.Combine(uploadFolder, "converted_" + Path.GetFileNameWithoutExtension(file.FileName) + ".pdf");

            using (var stream = new FileStream(inputPathFile, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Python Script
            var filepath = Path.Combine(pythonScript, "ExcelToPdf.py");
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

            using (var process = Process.Start(psi))
            {
                await process.WaitForExitAsync();
                var error = process.StandardError.ReadToEnd();
                if (process.ExitCode != 0)
                {
                    return StatusCode(500, "Converting failed: " + error);
                }
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(outputPathFile);
            return File(fileBytes, "application/pdf", Path.GetFileName(outputPathFile));
        }
    }
}
