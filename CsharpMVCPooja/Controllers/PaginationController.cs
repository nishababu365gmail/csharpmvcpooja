using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    
    public class PaginationController : Controller
    {
        PaginationSearchModel mdl = new PaginationSearchModel();
        DbOperations op = new DbOperations();
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetSearchPage()
        {
            mdl.phonenumber = "";
            mdl.studentname = "";
            mdl.courseid = 0;
            return View("FirstSearch",mdl);
        }
        [HttpGet]
        public IActionResult GetSearchPage1(string studentname,string phonenumber,int ?courseid, PaginationSearchModel mdl)
        {
            
            List<PaginationListModel> lst = new List<PaginationListModel>();
            mdl.studentname = studentname;
            mdl.phonenumber = phonenumber;
            mdl.courseid = courseid;
            lst= op.GetPaginationlist(studentname, phonenumber, courseid);
            mdl.count =lst.Count;
            mdl.totalpages= (int)Math.Ceiling(decimal.Divide(mdl.count, mdl.pagesize));
            mdl.lstsearchresult = lst.OrderBy(d => d.studentname).Skip((1 - 1) * mdl.pagesize).Take(mdl.pagesize).ToList();
            return View("FirstSearch",mdl);
        }
        public PaginationController()
        {
            mdl.count = 8;
            mdl.currentpage = 1;
            mdl.totalpages = 8 / 2;
        }
        [HttpGet]
        public IActionResult GetListForAnchor(int currentpage, int ? courseid,string   studentname,string  phonenumber)
        {
            List<PaginationListModel> lst = new List<PaginationListModel>();
            lst = op.GetPaginationlist(studentname,phonenumber,courseid);
            mdl.courseid = courseid;
            mdl.studentname = studentname;
            mdl.phonenumber = phonenumber;
           // mdl.lstsearchresult = lst;
            mdl.count = lst.Count;
            mdl.totalpages = (int)Math.Ceiling(decimal.Divide(mdl.count, mdl.pagesize));
            mdl.lstsearchresult= lst.OrderBy(d => d.studentname).Skip((currentpage - 1) * mdl.pagesize).Take(mdl.pagesize).ToList();
            return View("FirstSearch", mdl);
        }
    }
}
