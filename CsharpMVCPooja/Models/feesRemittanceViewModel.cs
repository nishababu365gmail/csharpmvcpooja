using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class FeesRemittanceViewModel
    {
        public int Id { get; set; }
        public int StudentCourseId { get; set; }
        public int PayingAmount { get; set; }
        public DateTime PayingDate { get; set; }
        public int TotalFees { get; set; }
        public int PaidFees { get; set; }
        public int BalanceFees { get; set; }
    }
}
