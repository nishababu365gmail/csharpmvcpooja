using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class JsonFeesDetailsViewModel
    {
        public int TotalFees { get; set; }
        public int PaidFees { get; set; }
        public int BalanceFees { get; set; }
        public int StudentCourseId { get; set; }
    }
}
