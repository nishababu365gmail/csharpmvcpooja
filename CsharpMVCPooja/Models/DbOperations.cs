using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja.Models
{
    public class DbOperationsSurangma
    {
        private  SqlConnection GetConnection()
        {
            string connectionstring = "server=DESKTOP-E6HHG75\\SQLEXPRESS;Database=AniTutorial;Trusted_Connection=True;";
            SqlConnection conn = new SqlConnection(connectionstring);
            return conn;
        }

        public List<StudentViewModel> GetAllStudents()
        {
            List<StudentViewModel> lststudent = new List<StudentViewModel>();
            StudentViewModel obj = new StudentViewModel();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "sp_get_all_students";
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            using(SqlConnection conn = GetConnection())
            {
                cmd.Connection = conn;
                conn.Open();

                using (SqlDataReader rd = cmd.ExecuteReader())
                {
                    while (rd.Read()) { 
                    obj = new StudentViewModel();
                    obj.Id = Convert.ToInt32(rd["Id"]);
                    obj.StudentName = Convert.ToString(rd["StudentName"]);
                    lststudent.Add(obj);
                    }
                }
            }
            return lststudent;
        }
        public JsonFeesDetailsViewModel GetFeeDetailsForStudentCourse(string studentid,string courseid)
        {
            
            JsonFeesDetailsViewModel obj = new JsonFeesDetailsViewModel();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[sp_get_all_student_course_feesdetails]";
            SqlParameter[] pms = new SqlParameter[2];
            pms[0] = new SqlParameter("@studentid", System.Data.SqlDbType.Int);
            cmd.Parameters.Add(pms[0]);
            pms[0].Value = studentid;
            pms[1] = new SqlParameter("@courseid", System.Data.SqlDbType.Int);
            cmd.Parameters.Add(pms[1]);

            pms[1].Value = courseid;
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            using (SqlConnection conn = GetConnection())
            {
                cmd.Connection = conn;
                conn.Open();

                using (SqlDataReader rd = cmd.ExecuteReader())
                {

                    while (rd.Read())
                    {
                        obj = new JsonFeesDetailsViewModel();
                        obj.StudentCourseId = Convert.ToInt32(rd["studentcourseid"]);
                        obj.TotalFees = Convert.ToInt32(rd["coursefee"]);
                        obj.PaidFees = Convert.ToInt32(rd["paidfees"]);
                        obj.BalanceFees= Convert.ToInt32(rd["balancefees"]);
                    }
                }
            }
            return obj;
        }
            
        public List<CourseViewModel> GetCourseForStudent(string studentid)
        {
            List<CourseViewModel> lststudent = new List<CourseViewModel>();
            CourseViewModel obj = new CourseViewModel();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "sp_get_course_for_student";
            SqlParameter[] pms = new SqlParameter[1];
            pms[0] = new SqlParameter("@StudentId", System.Data.SqlDbType.Int);
            cmd.Parameters.Add(pms[0]);

            pms[0].Value = studentid;
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            using (SqlConnection conn = GetConnection())
            {
                cmd.Connection = conn;
                conn.Open();

                using (SqlDataReader rd = cmd.ExecuteReader())
                {

                    while (rd.Read()) { 
                    obj = new CourseViewModel();
                    obj.Id = Convert.ToInt32(rd["Id"]);
                    obj.CourseName = Convert.ToString(rd["CourseName"]);
                    obj.CourseFee = Convert.ToInt32(rd["CourseFees"]);
                    lststudent.Add(obj);
                }
                }
            }
            return lststudent;
        }
        
        public void InsertFees(DataTable dt)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[sp_insert_fees_remittance]";
            SqlParameter pms = new SqlParameter();
            pms.ParameterName = "@FeesTableType";
            cmd.Parameters.Add(pms);
            pms.Value = dt;           
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (SqlConnection conn = GetConnection())
                {
                    SqlTransaction transaction;
                // Start a local transaction.
                conn.Open();
                transaction = conn.BeginTransaction("FeesTransaction");

                 cmd.Connection = conn;
                cmd.Transaction = transaction;
                try
                {
                    cmd.ExecuteNonQuery();

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    try { 
                    transaction.Rollback();
                    }
                    catch (Exception anotherex)
                    {

                    }
                }
            }

           
        }
    }
}
