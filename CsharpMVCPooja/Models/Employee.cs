using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using CsharpMVCPooja.Models.CustomValidations;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Models
{
    public class Employee
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(10)]
        public string firstname { get; set; }
        [Required]
        public int age { get; set; }
        [Required]
        public int stateid { get; set; }
        public string photopath { get; set; }
        [DataType(DataType.Date)]
        //[Required]
        public DateTime DateOfBirth { get; set; }
        public List<SelectListItem> statelist { get; set; }
        public Employee(){
            statelist = new List<SelectListItem>();
        }
        public IFormFile photo { get; set; }
        // [EmailDomainAttribute(ErrorMessage="Enter valid Email")]
        [ValidEmailDomain(allowedDomain: "gmail.com",
       ErrorMessage = "Email domain must be gmail.com")]
       // [RegularExpression(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", ErrorMessage = "Please enter a valid e-mail adress")]
       //[RegularExpression(@" ^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$",ErrorMessage ="Enter valid")]
       [RegularExpression(@"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", ErrorMessage ="Enter valid ans sanit")]
        public string Email { get; set; }
        [Remote("IsAdharNoExists","Employee",AdditionalFields ="Id")]
       
        public string AdharNo { get; set; }

        public char IsOutDoor { get; set; }
    }
    
}
