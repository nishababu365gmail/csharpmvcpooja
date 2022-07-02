using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;

namespace CsharpMVCPooja.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly ILogger _logger;
        DbOperations op = new DbOperations();
        private IWebHostEnvironment _env;
        public List<SelectListItem> StateList { get; set; }
        // GET: EmployeeController
        public EmployeeController(IWebHostEnvironment env, ILogger<EmployeeController> logger)
        {
            _env = env;
            _logger = logger;
        }
        public ActionResult Index()
        {
            dynamic d = "nisha";
            List<dynamic> lstdynamic = new List<dynamic>();
            lstdynamic.Add(d);
            
            _logger.LogInformation("Error");
            List<Employee> lst = new List<Employee>();
            Employee e = new Employee();
            e.firstname = "n";
            e.Id = 19;
            e.age = 89;
            lst.Add(e);

            e= new Employee();
            e.firstname = "b";
            e.Id = 19;
            e.age = 89;
            lst.Add(e);
           dynamic mytest= lst.Where(x => x.Id == 19).Select(x => new { x.firstname });
            lstdynamic.Clear();
            lstdynamic.Add(mytest);
            foreach (var items in lstdynamic)
            {
                foreach (var item in items)
                {
                    object c = item.firstname;
                }
                
            }
            return View(lstdynamic);
        }

        // GET: EmployeeController/Details/5
        public ActionResult Details(int id)
        {
            
            return View();
        }

        // GET: EmployeeController/Create
        public ActionResult Create()
        {

          //  op.insertuser("nisha", "maani");
          bool check=  op.getBlobData("nisha","vavaa");
            //List<SelectListItem> lststate = new List<SelectListItem>();
            //lststate.Add(
            //    new SelectListItem()
            //    { Value = "1", Text = "Keralam" });
            //    lststate.Add(new SelectListItem()
            //    { Value = "2", Text = "Bengal" });
            //lststate.Add(new SelectListItem()
            //{ Value = "3", Text = "Sikhim" });
            //lststate.Add(new SelectListItem()
            //{ Value = "4", Text = "Manipur" });
            Employee e = new Employee();
            e = GetEmployee();
            //e.statelist = lststate;
            //e.DateOfBirth = DateTime.Now;
            return View(e);
        }
        private Employee GetEmployee()
        {
            List<SelectListItem> lststate = new List<SelectListItem>();
            lststate.Add(
                new SelectListItem()
                { Value = "1", Text = "Keralam" });
            lststate.Add(new SelectListItem()
            { Value = "2", Text = "Bengal" });
            lststate.Add(new SelectListItem()
            { Value = "3", Text = "Sikhim" });
            lststate.Add(new SelectListItem()
            { Value = "4", Text = "Manipur" });
            Employee e = new Employee();
            e.statelist = lststate;
            e.DateOfBirth = DateTime.Now;
            return e;
        }
        // POST: EmployeeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Employee collection)
             {
            string photofilename = "";
            string photofoldername = "";
            string photopath = "";
            try
            {
                
                if (collection.photo != null)
                {
                    photofilename = Guid.NewGuid().ToString() + "_" + collection.photo.FileName;
                    photofoldername = Path.Combine(_env.WebRootPath, "images");
                    photopath = Path.Combine(photofoldername, photofilename);
                }
                // emp.firstname = collection["firstname"].ToString();
                // emp.DateOfBirth=Convert.ToDateTime( collection["DateOfBirth"]);
                string dateString = String.Format("{0:yyyy/MM/dd}", collection.DateOfBirth);

                var myDate = DateTime.ParseExact(dateString, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None);

                DateTime dt = Convert.ToDateTime(dateString);
                collection.photopath = photofilename;
                collection.photo.CopyTo(new FileStream(photopath, FileMode.Create));
                Employee emp = new Employee();
                emp.firstname = collection.firstname;
                emp.DateOfBirth = collection.DateOfBirth;
                emp.photopath = photofilename;
                
                Dbops.saveemp(emp);
               // op.saveemp(emp);
               //string nisha= collection["firstname"].ToString();

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                Employee e = GetEmployee();
                return View(e);
            }
        }

        // GET: EmployeeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: EmployeeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: EmployeeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: EmployeeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        public JsonResult IsAdharNoExists(string AdharNo,int Id)
        {
            return Json(true);
        }

        [HttpGet]
        public ActionResult GetPdf()
        {
            string filePath = "~/files/C#.pdf";
            Response.Headers.Add("Content-Disposition", "inline; filename=test.pdf");
            return File(filePath, "application/pdf");
        }

        public IActionResult Get()
        {
            var stream = new FileStream(@"wwwroot/files/C#.pdf", FileMode.Open);
            return new FileStreamResult(stream, "application/pdf");
        }

    }
}
