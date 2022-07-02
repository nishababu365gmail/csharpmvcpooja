using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class SurangmaFeesController : Controller
    {
        // GET: SurangmaFeesController
        public ActionResult ListStudentCourse()
        {
            List<SurangmaFeesHeader> hdlist = new List<SurangmaFeesHeader>();
            List<SurangmaFeesDetails> dtlist = new List<SurangmaFeesDetails>();
            SurangmaFeesHeader hd = new SurangmaFeesHeader();
            SurangmaFeesDetails dt = new SurangmaFeesDetails();
            hd.StudentName = "Nisha";
            hd.CourseName = "Python";
            hdlist.Add(hd);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 1;
            dt.FeesAmount = 2000;
            dt.PaymentDate = Convert.ToDateTime("02-09-2009");
            dtlist.Add(dt);
            dt.PaymentId = 2;
            dt.FeesAmount = 400;
            dt.PaymentDate = Convert.ToDateTime("02-10-2009");
            dtlist.Add(dt);
            hd.FeesDetails = dtlist;
            hd = new SurangmaFeesHeader();
            hd.StudentName = "Nisha";
            hd.CourseName = "Lisp";
            hdlist.Add(hd);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 7;
            dt.FeesAmount = 3900;
            dt.PaymentDate = Convert.ToDateTime("01-09-2009");
            dtlist = new List<SurangmaFeesDetails>();
            dtlist.Add(dt);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 8;
            dt.FeesAmount = 1400;
            dt.PaymentDate = Convert.ToDateTime("02-10-2010");
            dtlist.Add(dt);
            hd.FeesDetails = dtlist;
            hd = new SurangmaFeesHeader();
            hd.StudentName = "Surangma";
            hd.CourseName = System.Web.HttpUtility.HtmlDecode("Go++");
            hdlist.Add(hd);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 17;
            dt.FeesAmount = 2200;
            dt.PaymentDate = Convert.ToDateTime("01-02-2011");
            dtlist = new List<SurangmaFeesDetails>();
            dtlist.Add(dt);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 18;
            dt.FeesAmount = 11400;
            dt.PaymentDate = Convert.ToDateTime("02-8-2016");
            dtlist.Add(dt);
            hd.FeesDetails = dtlist;
            hd = new SurangmaFeesHeader();
            hd.StudentName = "Surangma";
            hd.CourseName = "Javascript";
            hdlist.Add(hd);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 28;
            dt.FeesAmount = 11400;
            dt.PaymentDate = Convert.ToDateTime("02-8-2016");
            dtlist = new List<SurangmaFeesDetails>();
            dtlist.Add(dt);
            dt = new SurangmaFeesDetails();
            dt.PaymentId = 58;
            dt.FeesAmount = 2300;
            dt.PaymentDate = Convert.ToDateTime("11-8-2016");
            dtlist.Add(dt);
            hd.FeesDetails = dtlist;
            return View(hdlist);
        }

        // GET: SurangmaFeesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SurangmaFeesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SurangmaFeesController/Create
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

        // GET: SurangmaFeesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SurangmaFeesController/Edit/5
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

        // GET: SurangmaFeesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SurangmaFeesController/Delete/5
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
    }
}
