using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArticleBlog.InstancesDto;
using ArticleBlog.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IManagement<User> repository { get; }
        private IMapper mapper { get; }
        public UsersController(IManagement<User> management, IMapper mapperrepo) {

            repository = management;
            mapper = mapperrepo;
        }
        [HttpGet]
        public ActionResult<IEnumerable<UserDto>> GetUsers() => Ok(mapper.Map<IEnumerable<UserDto>>(repository.GetAll()));
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUser(int id)
        {

            var user = mapper.Map<UserDto>(repository.GetId(id));
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }
        [HttpGet("articles/{id}")]
        public ActionResult<UserDto> GetUserArticle(int id)
        {

            var user = mapper.Map<UserDto>(repository.GetId(id));
            if (user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }
        [Authorize]
        [HttpPost("deletecurrentuser/{id}")]
        public ActionResult DeleteCurrentUser(int id) {
           
           var currentUser = repository.GetId(id);
           if(currentUser != null)
            {
                repository.Delete(currentUser);
                return Ok("Deleted");
            }
            return NotFound();
        }
    }
}