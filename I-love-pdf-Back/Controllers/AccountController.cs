using I_love_pdf.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using I_love_pdf.Dto;

namespace I_love_pdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public readonly UserManager<ApplicationUser> useManager;
        public readonly IConfiguration config;
        public AccountController(UserManager<ApplicationUser> useManager, IConfiguration config)
        {
            this.useManager = useManager;
            this.config = config;   
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto userDto)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = userDto.Email,
                    Email = userDto.Email,
                    Name = userDto.Name
                };
                var res = await useManager.CreateAsync(user, userDto.Password);
                if (!res.Succeeded)
                {
                    return BadRequest(res.Errors);
                }
                return Ok("Registeration successfully");

            }
        }
    }
}
