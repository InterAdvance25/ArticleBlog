using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArticleBlog.Models
{
    public class Article
    {
        public int Id { get; set; } 
        public string Description { get; set; }
        public string Theme { get; set; }
        public string Header { get; set; }
        public DateTime DateTime { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
