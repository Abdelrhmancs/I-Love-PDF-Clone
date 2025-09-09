using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Rotate : ControllerBase
    {
        [HttpPost("rotate")]
        public async Task<IActionResult> RotatePdf([FromForm] List<IFormFile> files, [FromForm] int degrees)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Please upload at least one PDF file.");
 
            if (degrees != 90 && degrees != 180 && degrees != 270)
                return BadRequest("Rotation must be 90, 180, or 270 degrees.");

            var file = files.First();
            var pythonScript = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts";

            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploadFiles");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var inputFile = Path.Combine(uploadFolder, file.FileName);
            var outputFile = Path.Combine(uploadFolder, Path.GetFileNameWithoutExtension(file.FileName) + "_rotated.pdf");

            using (var stream = new FileStream(inputFile, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // script path
            var filepath = Path.Combine(pythonScript, "Rotate.py");
            var psi = new ProcessStartInfo
            {
                FileName = "Python",
                Arguments = $"\"{filepath}\" \"{inputFile}\" \"{outputFile}\" {degrees}",
                WorkingDirectory = pythonScript,
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using (var process = Process.Start(psi))
            {
                if (process != null)
                {
                    await process.WaitForExitAsync();
                    var error = process.StandardError.ReadToEnd();
                    if (process.ExitCode != 0)
                    {
                        return StatusCode(500, "failed :" + error);
                    }
                }
                else
                {
                    return BadRequest("Error starting Python process.");
                }
            }

            if (!System.IO.File.Exists(outputFile))
            {
                return StatusCode(500, $"Python script finished but output file not found: {outputFile}");
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(outputFile);
            return File(fileBytes, "application/pdf", Path.GetFileName(outputFile));
        }
    }
}
