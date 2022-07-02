using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class PaginationSearchModel
    {
        public int count { get; set; }
        public int totalpages { get; set; }
        public int currentpage { get; set; }
        public int ? courseid { get; set; }
        public string studentname { get; set; }
        public string  phonenumber { get; set; }
        public int pagesize { get; set; } = 2;
        public List<PaginationListModel> lstsearchresult { get; set; }
    }
}
