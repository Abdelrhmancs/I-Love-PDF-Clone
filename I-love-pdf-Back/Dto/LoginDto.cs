using System.ComponentModel.DataAnnotations;
namespace I_love_pdf.Dto
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
