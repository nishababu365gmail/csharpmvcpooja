using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class jqdate
    {
        [Required]
        [Display(Name ="Joining Date")]
        public DateTime joiningdate { get; set; }
    }
}
