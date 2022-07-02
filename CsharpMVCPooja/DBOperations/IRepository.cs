using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.DBOperations
{
    public interface IRepository<T>where T:class
    {
        IDbConnection dbConnection { get; set; }

         T InsertModel(T model);
         void EditModel(T model);
         void DeleteModel(int id);
         List<T> GetAllModel();
         T GetSingleModel(int id);
    }
}
