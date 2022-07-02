using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class ModelCalender
    {
        public DateTime DateToStartWith { get; set; }
        public int StartPoint { get; set; }
        public List<ModelCalenderPartyDetails> ListPartyDetails { get; set; }
    }
}
