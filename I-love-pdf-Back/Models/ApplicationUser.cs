using Microsoft.AspNetCore.Identity;

namespace I_love_pdf.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string  Name { get; set; }
    }
}
