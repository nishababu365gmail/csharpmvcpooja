using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class SearchResultFeesMaster
    {
        public string StudentName { get; set; }
        public string CourseName { get; set; }
        public decimal FeesOriginal { get; set; }
        public decimal FeesPaid { get; set; }
        public decimal FeesDue { get; set; }
    }
}
