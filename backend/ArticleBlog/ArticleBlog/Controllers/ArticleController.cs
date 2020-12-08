using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ArticleBlog.Database;
using ArticleBlog.InstancesDto;
using ArticleBlog.Models;
using ArticleBlog.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArticleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private IManagement<Article> articleRepository { get; set; }
        private IMapper mapper { get; set; }
        private AppDbContext context { get; }
        public ArticleController(AppDbContext dbcontext,IManagement<Article> management,IMapper mapperdi) {
            articleRepository = management;
            mapper = mapperdi;
            context = dbcontext;
        }

        [HttpGet("search/{name?}")]
        public ActionResult GetArticles(string name) {

            if (string.IsNullOrWhiteSpace(name)) return Ok(articleRepository.GetAll());
            var result = articleRepository.GetAll()
                .Where(article => article.Header.Contains(name,StringComparison.InvariantCultureIgnoreCase));
            return Ok(result);
        }
        
        [HttpGet("{id}")]
        public ActionResult<ArticleDto> GetArticleById(int id) {

            var result = articleRepository.GetId(id);
            var article = mapper.Map<ArticleDto>(result);
            if (result != null) {
                return Ok(article);
            }
            return NotFound();
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddArticle(ArticleViewModel model) {
            if (User.Identity.IsAuthenticated) {
                string email = User.FindFirstValue(ClaimTypes.Email);
                var user = await context.Users
                    .FirstOrDefaultAsync(user => user.Email == email); 
              if(user != null) {
                    articleRepository.Add(new Article
                    {
                        Header = model.Header,
                        Theme = model.Thematic,
                        Description = model.Description,
                        DateTime = DateTime.Now,
                        UserId = user.Id,
                        User = user
                    });
                    return Ok();
                }
              else{
                    return BadRequest();
                }
            }
            return Forbid();
        }
        [Authorize]
        [HttpPost("deletearticle/{id}")]
        public ActionResult DeleteCurrentUser(int id)
        {
            var currentArticle = articleRepository.GetId(id);
            if (currentArticle != null)
            {
                articleRepository.Delete(currentArticle);
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}