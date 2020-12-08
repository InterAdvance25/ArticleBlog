using ArticleBlog.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArticleBlog.Models
{
    public class Management<T> : IManagement<T> where T:class
    {
        private AppDbContext context { get; }
        public Management(AppDbContext dbContext) => context = dbContext;
        public T Add(T instance)
        {
            context.Set<T>().Add(instance);
            context.SaveChanges();
            return instance;
        }

        public void Delete(T instance)
        {
            context.Remove<T>(instance);
            context.SaveChanges();
        }
        public IEnumerable<T> GetAll() => context.Set<T>(); 

        public T GetId(int id) {

            string type = typeof(T).Name;
            if (type.Contains("Article", StringComparison.OrdinalIgnoreCase))
            {

                context.Entry(context.Articles.FirstOrDefault(p => p.Id == id)).Reference(p => p.User).Load();
                return context.Set<T>().Find(id);
            }
            else
            {
                context.Entry(context.Users.FirstOrDefault(p => p.Id == id)).Collection(collection => collection.Articles).Load();
                return context.Set<T>().Find(id);
            }
        }

    }
}
