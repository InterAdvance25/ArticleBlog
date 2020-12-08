using ArticleBlog.InstancesDto;
using ArticleBlog.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArticleBlog.Profiles
{
    public class ArticleProfile : Profile
    {
        public ArticleProfile() {
            CreateMap<Article, ArticleDto>();
            CreateMap<User, UserDto>();
        }
    }
}
