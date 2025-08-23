using I_love_pdf.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using I_love_pdf.Dto;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto userDto)
        {
          
            if (ModelState.IsValid)
            {
                ApplicationUser user = await useManager.FindByEmailAsync(userDto.Email);
                if(user != null)
                {
                    bool found = await useManager.CheckPasswordAsync(user, userDto.Password);
                    if (found)
                    {
                        // claims
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Name, user.Name));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

                        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                        var roles = await useManager.GetRolesAsync(user);
                        foreach (var role in roles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, role));
                        }
                        // create token 
                        SecurityKey securityKey = new SymmetricSecurityKey
                               (Encoding.UTF8.GetBytes(config["JWT:secret"]));
                        SigningCredentials signcred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                        JwtSecurityToken token = new JwtSecurityToken(
                            issuer: config["JWT:ValidIssuer"],
                            audience: config["JWT:ValidAudience"],
                            claims: claims,
                            expires: DateTime.Now.AddHours(3),
                            signingCredentials: signcred
                        );
                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo

                        });
                    }
                    return Unauthorized("invalid password");
                }
                return Unauthorized();

            }
            return Unauthorized();
        }
    }
}
