using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnlockPdf : ControllerBase
    {
        [HttpPost("unlock-pdf")]
        public async Task<IActionResult> Unlock(List<IFormFile> files, [FromForm] string password)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("upload file");
            }
            else if (password == "")
            {
                return BadRequest("write password ");
            }
            var file = files.First();
            var pythonScript = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts";
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploadFiles");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var inputFile = Path.Combine(uploadFolder, file.FileName);
            var outputFile = Path.Combine(uploadFolder, "unlocked_" + file.FileName);

            var stream = new FileStream(inputFile, FileMode.Create);
            await file.CopyToAsync(stream);
            stream.Close();


            //script
            var filepath = @"D:\Backend\I-Love-PDF-Clone\Pdf-Scripts\UnlockPdf.py";
            var psi = new ProcessStartInfo
            {
                FileName = "Python",
                Arguments = $"\"{filepath}\" \"{inputFile}\" \"{outputFile}\" \"{password}\"",
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
                    return StatusCode(500, "faild :" + error);
                }

            }

            var FileBaytes = await System.IO.File.ReadAllBytesAsync(outputFile);

            return File(FileBaytes, "application/pdf", Path.GetFileName(outputFile));

        }
    }
}
