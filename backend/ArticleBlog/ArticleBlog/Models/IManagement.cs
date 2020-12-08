using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArticleBlog.Models
{
    public interface IManagement<T>
    {
        IEnumerable<T> GetAll();
        T GetId(int id);
        T Add(T instance);
        void Delete(T instance);
    }
}
