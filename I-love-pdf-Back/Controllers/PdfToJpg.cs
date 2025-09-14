using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfToJpg : ControllerBase
    {
        [HttpPost("convert-pdf-to-jpg")]
        public async Task<IActionResult> ConvertToJpg(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload at least one PDF file.");

            var file = files.First();
            var pythonScript = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts";

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploadFiles");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var inputPathFile = Path.Combine(uploadFolder, file.FileName);
            var outputFolder = Path.Combine(uploadFolder, Path.GetFileNameWithoutExtension(file.FileName) + "_images");

            if (!Directory.Exists(outputFolder))
            {
                Directory.CreateDirectory(outputFolder);
            }

            using (var stream = new FileStream(inputPathFile, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Python Script
            var filepath = Path.Combine(pythonScript, "PdfToJpg.py");
            var psi = new ProcessStartInfo
            {
                FileName = "Python",
                Arguments = $"\"{filepath}\" \"{inputPathFile}\" \"{outputFolder}\"",
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

            // Return zipped images
            var zipPath = Path.Combine(uploadFolder, Path.GetFileNameWithoutExtension(file.FileName) + "_images.zip");
            if (System.IO.File.Exists(zipPath))
                System.IO.File.Delete(zipPath);

            System.IO.Compression.ZipFile.CreateFromDirectory(outputFolder, zipPath);

            var fileBytes = await System.IO.File.ReadAllBytesAsync(zipPath);
            return File(fileBytes, "application/zip", Path.GetFileName(zipPath));
        }
    }
}
