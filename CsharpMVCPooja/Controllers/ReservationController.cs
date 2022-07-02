using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CsharpMVCPooja.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CsharpMVCPooja.Controllers
{
    public class ReservationController : Controller
    {
        
            public async Task<IActionResult> Index()
            {
                List<Reservation> reservationList = new List<Reservation>();
                using (var httpClient = new HttpClient())
                {
                    using (var response = await httpClient.GetAsync("http://localhost:59075/api/Reservation"))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        reservationList = JsonConvert.DeserializeObject<List<Reservation>>(apiResponse);
                    }
                }
                return View(reservationList);
            }
        
    }
}
