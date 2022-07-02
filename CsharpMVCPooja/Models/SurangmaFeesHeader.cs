using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class SurangmaFeesHeader
    {
        public string StudentName { get; set; }
        public string CourseName { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public List<SurangmaFeesDetails> FeesDetails = new List<SurangmaFeesDetails>();
    }
}
