using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class Appuser
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string Gender { get; set; }
        public bool Ischecked { get; set; }

        public string Password { get; set; }
        public DateTime dob { get; set; }
    }
}
