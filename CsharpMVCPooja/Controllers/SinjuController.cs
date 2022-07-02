using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class SinjuController : Controller
    {
        public IActionResult Index(int ? currentPage)
        {
            int current = 0;
            if (currentPage.HasValue)
            {
                current= currentPage.Value;
            }
            ViewBag.totalpages = 8;
            ViewBag.currentpage = current;
            List<string> lstsectionA = new List<string>();
            List<string> lstsectionB = new List<string>();
            List<string> lstsectionC = new List<string>();
           
          
            lstsectionA.Add("Babu");
            lstsectionA.Add("Nisha Babu");
            lstsectionA.Add("Abhay Babu");
            lstsectionA.Add("Gopi");
            lstsectionA.Add("Chandrika");
            lstsectionA.Add("Murali");
            lstsectionA.Add("Sutti");
            lstsectionA.Add("Bruno");
            lstsectionB.Add("Violet");
            lstsectionB.Add("Indigo");
            lstsectionB.Add("Blue");
            lstsectionB.Add("Green");
            lstsectionB.Add("Yellow");
            lstsectionB.Add("Orange");
            lstsectionB.Add("Red");
            lstsectionB.Add("Light blue");
            lstsectionC.Add("mammotty");
            lstsectionC.Add("Saubin");
            lstsectionC.Add("tovino");
            lstsectionC.Add("Prthivi");
            lstsectionC.Add("Lal Mahna");
            lstsectionC.Add("Appu");
            lstsectionC.Add("Pranav");
            lstsectionC.Add("Mukesh");

            lstsectionC.Add("mammotty");
            int count = lstsectionA.Count;
            int totalpages = (int)Math.Ceiling(decimal.Divide(count, 2));
            //mdl.lstsearchresult = lstsectionA.OrderBy(d => d[0]).Skip((1 - 1) * 2).Take(2).ToList();
            List<List<string>> listall = new List<List<string>>();
            listall.Add(lstsectionA.Skip(current * 2).Take(2).ToList());
            listall.Add(lstsectionB.Skip(current * 2).Take(2).ToList());
            listall.Add(lstsectionC.Skip(current * 2).Take(2).ToList());
            return View(listall);
        }
    }
}
