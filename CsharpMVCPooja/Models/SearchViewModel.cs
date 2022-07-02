using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class SearchViewModel
    {
        public int studentid { get; set; }
        [BindProperty]
        public int courseid { get; set; }
        public List<SearchResultFeesMaster> FeesMasterDetails { get; set; }
    }
}
