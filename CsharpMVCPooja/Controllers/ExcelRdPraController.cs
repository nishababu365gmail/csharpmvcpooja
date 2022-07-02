using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace CsharpMVCPooja.Controllers
{
    public class ExcelRdPraController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ExcelRdPraController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            
            var path = Path.Combine(_webHostEnvironment.WebRootPath, "files/nisha.csv");
            var fileName = "~/files/nisha.csv";
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = System.IO.File.Open(path, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateCsvReader(stream))
                {

                    while (reader.Read()) //Each row of the file
                    {
                        //users.Add(new UserModel
                        //{
                        //    Name = reader.GetValue(0).ToString(),
                        //    Email = reader.GetValue(1).ToString(),
                        //    Phone = reader.GetValue(2).ToString()
                        //});
                    }
                }
            }
            return View();
        }
    }
}
