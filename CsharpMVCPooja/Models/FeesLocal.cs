using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class FeesLocal
    {
        public string studentid { get; set; }
        public string courseid { get; set; }
        public string date { get; set; }
        public decimal currfees { get; set; }
        public int studentcourseid { get; set; }
    }
}
