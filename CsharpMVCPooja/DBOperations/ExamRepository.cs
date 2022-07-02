using CsharpMVCPooja.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.DBOperations
{
    public interface ISubjectRepository : IRepository<Subject>
    {

    }
    public class SubjectRepository : ISubjectRepository
    {
        public IDbConnection dbConnection { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public void DeleteModel(int id)
        {
            throw new NotImplementedException();
        }

        public void EditModel(Subject model)
        {
            throw new NotImplementedException();
        }

        public List<Subject> GetAllModel()
        {
            throw new NotImplementedException();
        }

        public Subject GetSingleModel(int id)
        {
            throw new NotImplementedException();
        }

        public Subject InsertModel(Subject model)
        {
            throw new NotImplementedException();
        }
    }
}
