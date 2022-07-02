using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class vavacontroller : Controller
    {
        // GET: vavacontroler
        public ActionResult Index()
        {
            return View();
        }

        // GET: vavacontroler/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: vavacontroler/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: vavacontroler/Create
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

        // GET: vavacontroler/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: vavacontroler/Edit/5
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

        // GET: vavacontroler/Delete/5
        [HttpGet]
        public ActionResult SearchFeesMaster()
        {
            SearchViewModel svm = new SearchViewModel();
            
            return View(svm);
        }
        [HttpPost]
        public ActionResult SearchFeesMaster(SearchViewModel md)
        {
            List<SearchResultFeesMaster> lstmaster = new List<SearchResultFeesMaster>();
            SearchResultFeesMaster srf = new SearchResultFeesMaster();
            srf.StudentName = "Anju";
            srf.CourseName = "Asp.net";
            srf.FeesOriginal = 12000;
            srf.FeesPaid = 1000;
            srf.FeesDue = 11000;
            lstmaster.Add(srf);
            srf = new SearchResultFeesMaster();
            srf.StudentName = "Divya";
            srf.CourseName = "Django";
            srf.FeesOriginal = 25000;
            srf.FeesPaid = 20000;
            srf.FeesDue = 5000;
            lstmaster.Add(srf);
            SearchViewModel model = new SearchViewModel();
            model.studentid = md.studentid;
           model.courseid = md.courseid;
            model.FeesMasterDetails = lstmaster;
            return View(model);
        }
        public ActionResult SearchFeesDetails(string studentid,string courseid)
        {
            //Write logic for getting fees remittance history
            return View();

            
        }
        
        [HttpGet]
      //[Route("vava/SearchFeesDetails1/{courseid:int}")]
        public ActionResult SearchFeesDetails1( int icourseid,int studentid)
        {
            
            //Write logic for getting fees remittance history
            return View();


        }
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: vavacontroler/Delete/5
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
