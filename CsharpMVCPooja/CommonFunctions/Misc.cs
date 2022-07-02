using CsharpMVCPooja.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.CommonFunctions
{
    public static class Misc
    {
        public static DataTable ChangeFeesObjectsToDataTable(IList<FeesLocal> feeslist)
        {
            DataTable feestable = new DataTable();
            feestable.Columns.Add("FeesId");
            feestable.Columns.Add("StudentCourseId");
            feestable.Columns.Add("FeesAmount");
            feestable.Columns.Add("TransactionDate");
            
            DataRow rw = feestable.NewRow();
            int ct = 0;
            foreach (var item in feeslist)
            {
                ct = ct + 1;
                rw = feestable.NewRow();
                rw["FeesId"] = ct;
                rw["StudentCourseId"] = item.studentcourseid;
                rw["FeesAmount"] = item.currfees;
                rw["TransactionDate"] = item.date;
                
                feestable.Rows.Add(rw);

            }
            return feestable;
        }
    }
}
