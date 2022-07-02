using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections;

namespace CsharpMVCPooja.Controllers
{
    public class scb
    {
        public int Id { get; set; }
        public string    name { get; set; }
    }
    public class testcontroller : Controller
    {
        // GET: testcontroller

        public IActionResult sitharafirstclass(int firstnum ,int secondnum)
        {
          int resultnum=  firstnum + secondnum;
            ViewBag.resultnum = resultnum;
            return View();
        }
        public ActionResult Index()
        {
           
            List<scb> lstscb = new List<scb>();
            List<int> testindlist = new List<int>();
            scb s = new scb();
            s.Id = 1;
            s.name = "nisha";
            lstscb.Add(s);
                s = new scb();
            s.Id = 2;
            s.name = "babu";
            lstscb.Add(s);
            var idlist = lstscb.Select(x => x.Id).ToList();
            testindlist = idlist;
            return View();
        }
        public ActionResult Index1()
        {
            skill sk = new skill();
            return View(sk);
        }
        [HttpPost]
        public ActionResult Index1(skill s)
        {
            skill sk = new skill();
            return View();
        }
        public JsonResult GetCombodata()
        {
            List<List<SelectListItem>> mylst = new List<List<SelectListItem>>();
            List<SelectListItem> lst = new List<SelectListItem>()
            {
                new SelectListItem("1","Nisha"),
                new SelectListItem("2","Babu"),
                new SelectListItem("3","Vava"),
                new SelectListItem("4","Abhay"),
                new SelectListItem("5","Murali"),
                new SelectListItem("6","Sutti")
            };
            mylst.Add(lst);
            List<SelectListItem> lstlevel = new List<SelectListItem>()
            {
                new SelectListItem("1","Advanced"),
                new SelectListItem("2","Basic"),
                new SelectListItem("3","Intermediate")
                
            };
            mylst.Add(lstlevel);
            return Json(mylst);
            
        }
        // GET: testcontroller/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: testcontroller/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: testcontroller/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
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

        // GET: testcontroller/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: testcontroller/Edit/5
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

        // GET: testcontroller/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: testcontroller/Delete/5
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
        [HttpGet]
        public ActionResult CheckTabeRow(string stname,string stcourse)
        {
            Employee emp = new Employee();
            emp.Id = 12;
            emp.firstname = "Nisha";
            emp.age = 90;
            emp.stateid = 1;
            emp.DateOfBirth = Convert.ToDateTime("09/09/2020");
            List<Employee> st = new List<Employee>();
            st.Add(emp);
            ViewData["mydata"] = st;
            return View();
        }
        public ActionResult CheckTabeRow1(string stname, string stcourse)
        {
            Employee emp = new Employee();
            emp.firstname = "Nisha";
            emp.age = 90;
            emp.stateid = 1;
            emp.DateOfBirth = Convert.ToDateTime("09/09/2020");
            List<Employee> st = new List<Employee>();
            st.Add(emp);
            ViewData["mydata"] = st;
            //return Json(st);
            return PartialView("~/Views/vava/_hakka.cshtml", st);
        }
    }
}
