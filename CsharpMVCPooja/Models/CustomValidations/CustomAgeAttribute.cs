using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models.CustomValidations
{
    public class CustomAgeAttribute:ValidationAttribute
    {
        public override bool IsValid(object obj)
        {
            return base.Equals(obj);
        }
    }
}
