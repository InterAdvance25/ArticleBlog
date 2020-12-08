using ArticleBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArticleBlog.InstancesDto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public IEnumerable<Article> Articles { get; set; }
    }
}
