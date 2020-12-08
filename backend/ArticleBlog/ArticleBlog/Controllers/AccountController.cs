using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ArticleBlog.Database;
using ArticleBlog.Models;
using ArticleBlog.ViewModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ArticleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private IManagement<User> repository { get; }
        private AppDbContext context { get; }
        public AccountController(AppDbContext app, IManagement<User> dbContext){
            context = app;
            repository = dbContext;
        }
        [HttpPost("registration")]
        public async Task<IActionResult> Register(User model)
        {
            if (await context.Users.FirstOrDefaultAsync(p => p.Email == model.Email) == null) {
                var json = Authenticate(model);
                var user = repository.Add(new User { Name = model.Name, Email = model.Email, Password = model.Password, 
                    Position = model.Position, Company = model.Company });
                
                return Json(new { Id = user.Id, Token = json });
            }
            return BadRequest();
        }
        [HttpPost("token")]
        public async Task<IActionResult> Login(LoginViewModel user)
        {
            var result = await context.Users.FirstOrDefaultAsync(p => p.Email == user.Email && p.Password == user.Password);
            if (result != null) {
                var token = Authenticate(result);
                return Json( new {Id = result.Id, Token = token });
            }
            return BadRequest();
        }
        private IActionResult Authenticate(User user)
        {
            var claims = new List<Claim>() {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimsIdentity.DefaultNameClaimType,user.Name)
            };
            ClaimsIdentity identity = new ClaimsIdentity(claims, "Token", 
                ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            var jwt = new JwtSecurityToken(issuer: "IssuerToken", audience: "ClientConsumer",
                notBefore: DateTime.Now,
                claims:identity.Claims,
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("AGnAJH88274Nlfkhfh2382184dj3i2ub9342")),
                SecurityAlgorithms.HmacSha256));
            var encode = new JwtSecurityTokenHandler().WriteToken(jwt);
            return Ok(encode);
        }
    }
}