using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.CommonFunctions ;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace CsharpMVCPooja.Controllers
{
    public class SurangmaTableToSqlServerController : Controller
    {

        DbOperationsSurangma ops = new DbOperationsSurangma();
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult FeesRemittance()
        {
            
         List<StudentViewModel> lst=   ops.GetAllStudents();
            ViewBag.StudentList = new SelectList(lst, "Id", "StudentName");
            return View();
        }

        public JsonResult GetCourseForStudent(string studentid)
        {
          List<CourseViewModel>lst=  ops.GetCourseForStudent(studentid);
            return Json(lst);
        }

        public JsonResult GetFeeDetailsForStudentCourse(string studentid,string courseid)
        {
            JsonFeesDetailsViewModel obj = ops.GetFeeDetailsForStudentCourse(studentid,courseid);
            return Json(obj);
        }

        public void SaveToDb()        
        {
            string Result = string.Empty;
            MemoryStream stream = new MemoryStream();
            Request.Body.CopyTo(stream);
            stream.Position = 0;
            using (StreamReader reader = new StreamReader(stream))
            {
                string requestBody = reader.ReadToEnd();
                if (requestBody.Length > 0)
                {
                    //UpdateInsert(JsonConvert.DeserializeObject<Ajax_Model>(requestBody));
                    IList<FeesLocal> ctm =
                    JsonConvert.DeserializeObject<IList<FeesLocal>>(requestBody);
                    
                    DataTable feestable = new DataTable();
                    feestable= Misc.ChangeFeesObjectsToDataTable(ctm);

                    ops.InsertFees(feestable);
                }
            }          
        }

        //private class FeesLocal
        //{
        //    public string studentid { get; set; }
        //    public string courseid { get; set; }
        //    public string date { get; set; }
        //    public decimal currfees { get; set; }
        //    public int studentcourseid { get; set; }
            
        //}
    }
}
