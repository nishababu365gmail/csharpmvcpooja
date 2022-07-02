using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class OperatorController : Controller
    {
        public IActionResult Index()
        {
            Whoisgreater();
            return View();
        }
        public void Whoisgreater()
        {
            Employee1 nisha = new Employee1();
            Employee1 babu = new Employee1();
            nisha.salary = 90000;
            nisha.Name = "nisha babu";
            nisha.Designation = "no pani";
            nisha.Id = 1;
            nisha.printme();
            babu.salary = 90000;
           if(nisha >= babu)
            {
                float diff = nisha.salary - babu.salary;
            }

            else
            {
                float diff = babu.salary - nisha.salary;
            }
        }
    }
    public class Employee1
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float salary { get; set; }
        public string Designation { get; set; }

        public static bool operator >=(Employee1 d1, Employee1 d2)
        {
            Employee1 d3 = new Employee1();
            return  d1.salary >= d2.salary;
            
        }
        public static bool operator <=(Employee1 d1, Employee1 d2)
        {
            Employee1 d3 = new Employee1();
            return d1.salary <= d2.salary;

        }
        public void printme()
        {
        PropertyInfo[] propertymine=    this.GetType().GetProperties();
            foreach (var item in propertymine)
            {
               var myval= item.GetValue(this);
                Console.WriteLine(myval);
            }
        }
    }
    
    
    
}
