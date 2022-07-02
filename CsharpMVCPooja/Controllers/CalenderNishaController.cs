using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class CalenderNishaController : Controller
    {
        public IActionResult Index()
        {
            
            ModelCalender obj = new ModelCalender();
            var myday=Convert.ToDateTime("12-09-2021");
            //var day = DateTime.Today.Day;
            //var firstday= DateTime.Today.AddDays(-(day-1));
            //int startpoint = 0;
            var day = myday.Day;
            var firstday = myday.AddDays(-(day-1));
            int startpoint = 0;
            switch (firstday.DayOfWeek)
            {
                case DayOfWeek.Sunday:
                    startpoint = 1;
                    break;
                case DayOfWeek.Monday:
                    startpoint = 2;
                    break;
                case DayOfWeek.Tuesday:
                    startpoint = 3;
                    break;
                case DayOfWeek.Wednesday:
                    startpoint = 4;
                    break;
                case DayOfWeek.Thursday:
                    startpoint = 5;
                    break;
                case DayOfWeek.Friday:
                    startpoint = 6;
                    break;
                case DayOfWeek.Saturday:
                    startpoint = 7;
                    break;
               
            }
            var weekdayname = firstday.Day;
            obj.DateToStartWith = DateTime.Today.AddDays(-day);
            var month = DateTime.Today.Month;
            obj.StartPoint = startpoint;
            obj.ListPartyDetails = CreatePartyInfo();
            return View(obj);
        }
        private List<ModelCalenderPartyDetails> CreatePartyInfo()
        {
            List<ModelCalenderPartyDetails> listobj = new List<ModelCalenderPartyDetails>();
               ModelCalenderPartyDetails obj = new ModelCalenderPartyDetails();
            obj.PartyDay = 24;
            obj.PartyVenue = "LuluMall";
            obj.PartyTime = "11.30";
            listobj.Add(obj);
            obj = new ModelCalenderPartyDetails();
            obj.PartyDay = 24;
            obj.PartyVenue = "Sree Valsam";
            obj.PartyTime = "4.30";
            listobj.Add(obj);
            return listobj;
        }
    }
}
