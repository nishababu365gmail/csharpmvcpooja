using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class HashtableController : Controller
    {
        public IActionResult Index()
        {
            Hashtable numberNames = new Hashtable();
            numberNames.Add("feescollected", "first error");
            numberNames.Add("feestotal", "second error");
            numberNames.Add("feesrem", "third error");
            foreach (DictionaryEntry item in numberNames)
            {
                ModelState.AddModelError(item.Key.ToString(), item.Value.ToString());
            }
            return View();
        }
    }
}
