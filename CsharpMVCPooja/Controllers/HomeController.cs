using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CsharpMVCPooja.Models;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;
using CsharpMVCPooja.CustomAttributes;
using System.Security.Claims;
using IronOcr;
using System.Drawing;

namespace CsharpMVCPooja.Controllers
{

    
    public class HomeController : Controller
    {
        public void nnn() {
            Image newImage = null;
            var imageBytes = System.IO.File.ReadAllBytes(@"C:\Users\Admin\Desktop\Payment.jpg");
            using (var ms = new MemoryStream(imageBytes))
            {
                newImage= Image.FromStream(ms);
            }
            var Ocr = new IronTesseract(); // nothing to configure
        Ocr.Language = OcrLanguage.EnglishBest;
        Ocr.Configuration.TesseractVersion = TesseractVersion.Tesseract5;
using (var Input = new OcrInput())
{
                var ContentArea = new System.Drawing.Rectangle() { X = 215, Y = 1250, Height = 280, Width = 1335 };
                Input.AddImage(@"C:\Users\Admin\Desktop\sinju.jpg");
                //Input.Deskew();
                            var Result = Ocr.Read(Input);
        Console.WriteLine(Result.Text);
}

            var Ocr1 = new IronTesseract();
            Ocr1.Language = OcrLanguage.EnglishBest;
            Ocr.Configuration.PageSegmentationMode = TesseractPageSegmentationMode.SingleChar;
            using (var Input = new OcrInput(@"C:\Users\Admin\Desktop\Laxman.pdf"))
            {
                Input.DeNoise();
                Input.Invert();
                //Input.DeepCleanBackgroundNoise();
                var Result = Ocr.Read(Input);
                Console.WriteLine(Result.Text);
            }
        }


        List<gst> gstlist = new List<gst>();
        gst objgst = new gst();
        

        List<Ajax_Model> model = new List<Ajax_Model>();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public JsonResult Vava(string country)
        {

            List<Mydata> lstobj = new List<Mydata>();
            Mydata obj = new Mydata();
            obj.Text = "Nisha";
            obj.Value = 1;
            lstobj.Add(obj);
            obj = new Mydata();
            obj.Text = "Babu";
            obj.Value = 2;
            lstobj.Add(obj);
            return Json(lstobj);
            //return Json(new SelectListItem()
            //{
            //    Text = "vava",
            //    Value = "Abhay"
            //},
            //new SelectListItem()
            //{
            //    Text = "Babu",
            //    Value = "Nisha"
            //}
            //);
        }
        public JsonResult Babu(string country)
        {
            
            List<Mydata> lstobj = new List<Mydata>();
            Mydata obj = new Mydata();
            obj.Text = "Nisha";
            obj.Value = 1;
            lstobj.Add(obj);
            obj = new Mydata();
            obj.Text = "Babu";
            obj.Value = 2;
            lstobj.Add(obj);
            return Json(lstobj);
            //return Json(new SelectListItem()
            //{
            //    Text = "vava",
            //    Value = "Abhay"
            //},
            //new SelectListItem()
            //{
            //    Text = "Babu",
            //    Value = "Nisha"
            //}
            //);
        }
        
        public JsonResult Nisha()
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
                    IList<Ajax_Model> ctm =
        JsonConvert.DeserializeObject<IList<Ajax_Model>>(requestBody);
                }

            }

            return Json(GetUsers());
        }
        public IActionResult Index()
        {

            nnn();
            var identity = new ClaimsIdentity(new List<Claim>
{
    new Claim("UserId", "123", ClaimValueTypes.Integer32)
}, "Custom");

            HttpContext.User = new ClaimsPrincipal(identity);
            Dictionary<string, string> dict = new Dictionary<string, string>();
     HttpContext.Session.SetString("_UserName", "admin");
            int[] firstarray = new Int32[] {1,4,7,3 };
            int[] secondarray = new Int32[] { 2,9};
            IEnumerable<int> differenceQuery =
          firstarray.Except(secondarray);
            IEnumerable<int> differenceQuery1 =
         secondarray.Except(firstarray);
            return View();
        }

        public IActionResult Privacy()
        {
            sumtest();
            return View();
        }
        private void sumtest()
        {
            objgst.gstpercentage = 12;
            objgst.taxablevalue = 200;
            objgst.cgstamount = 120;
            gstlist.Add(objgst);
            objgst = new gst();
            objgst.gstpercentage = 12;
            objgst.taxablevalue = 210;
            objgst.cgstamount = 100;
            gstlist.Add(objgst);
            objgst = new gst();
            objgst.gstpercentage = 15;
            objgst.taxablevalue = 222;
            objgst.cgstamount = 11;
            gstlist.Add(objgst);
            var result = gstlist
    .GroupBy(x => x.gstpercentage)
    .Select(g => new {
        gstper = g.Key,
        Totaltaxablevalue = g.Sum(x => x.taxablevalue ),
        TotalCgst=g.Sum(y=>y.cgstamount)
    });
            //var feeResult = (from fee in fee_list
            //                 group fee by fee.Currency into groupResult
            //                 select new
            //                 {
            //                     Currency = groupResult.Key,
            //                     FinalFees = groupResult.Sum(f => f.FeesCustom > 0 ? f.FeesCustom : f.FeesNormal)
            //                 }).ToList();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        private List<Ajax_Model> GetUsers()
        {

            model.Add(new Ajax_Model
            {
                Gender = "Female",
                 Name="Nisha",
                  Role="Lead"
            });
            return model;
        }

        private void UpdateInsert(Ajax_Model model)

        {
        }

        public class Mydata
        {
            public int Value { get; set; }
            public string Text { get; set; }
        }
        public class Ajax_Model

        {

            public string Name { get; set; }

            public string Gender { get; set; }

            public string Role { get; set; }

        }
        public class gst
        {
            public decimal gstpercentage { get; set; }
            public decimal taxablevalue { get; set; }
            public decimal cgstamount { get; set; }
        }
    }
}
