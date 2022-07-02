using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CsharpMVCPooja.Controllers
{
    public class VazhiPaduController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Create()
        {
            return View();
        }
        
        public IActionResult CreateVazhiPadu( string nisha)
        {
            //from app.jsi am sending a list of javascript objects.Since we are sending a list of javascripts objects i used a ilist of niastvazhipadu
            IList<NiastVazhiPadu> ctm =
        JsonSerializer.Deserialize<IList<NiastVazhiPadu>>(nisha);
            //NiastVazhiPadu myDeserializedObj = JsonSerializer.Deserialize<NiastVazhiPadu>(nisha);
           // NiastVazhiPadu myDeserializedObj = (NiastVazhiPadu)Json.jDeserializeObject(Request["jsonString"], typeof(NiastVazhiPadu));
            return View();
        }
    }
}
