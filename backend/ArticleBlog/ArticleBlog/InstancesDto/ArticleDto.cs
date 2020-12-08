using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArticleBlog.InstancesDto
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Theme { get; set; }
        public string Header { get; set; }
        public DateTime DateTime { get; set; }
        public UserDto User { get; set; }
    }
}
