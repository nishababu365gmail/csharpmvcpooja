using CsharpMVCPooja.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CsharpMVCPooja
{
    public class DbOperations
    {
       string ConnectionString = "server=localhost;port=3306;database=niiast;user=root;password=123456";
       // string ConnectionString = "server=localhost;port=3306;database=sakila;user=root;password=123456";
        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public List<PaginationListModel> GetPaginationlist(string studentname, string phonenumber, int ? courseid)
        {
            List<PaginationListModel> lst = new List<PaginationListModel>();
            PaginationListModel lstmodel = new PaginationListModel();
            MySqlCommand cmd = new MySqlCommand();
            MySqlParameter[] pm = new MySqlParameter[3];
            cmd.CommandText = "sp_GetAllStudents";
            //argStudentName varchar(100),argPhonenumber varchar(15),argCourseId
             pm[0] = new MySqlParameter("argStudentName", MySqlDbType.VarChar);
            pm[0].Value = studentname;
            pm[1] = new MySqlParameter("argPhonenumber", MySqlDbType.VarChar);
            pm[1].Value = phonenumber;

            pm[2] = new MySqlParameter("argCourseId", MySqlDbType.Int32);
          if (courseid.HasValue==true)
            {
                pm[2].Value = courseid;
            }

            else
            {
                pm[2].Value = null;
            }
            cmd.Parameters.Add(pm[0]);
            cmd.Parameters.Add(pm[1]);
            cmd.Parameters.Add(pm[2]);

            cmd.CommandType = System.Data.CommandType.StoredProcedure;
           using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                cmd.Connection = conn;
                using(var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        lstmodel = new PaginationListModel();
                        lstmodel.studentname = reader["StuFirstName"].ToString();
                        lstmodel.phonenumber = reader["StuPhoneNo"].ToString();
                        lstmodel.coursename = reader["coursename"].ToString();
                        lst.Add(lstmodel);
                    }
                }
            }
            return lst;
        }
        public void saveemp(Employee model)
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.CommandText = "sp_saveEmployee";
            MySqlParameter[] pm = new MySqlParameter[3];
            pm[0] = new MySqlParameter("argEmployeeName", MySqlDbType.VarChar);
            pm[1] = new MySqlParameter("argDateofBirth", MySqlDbType.DateTime);
            pm[2] = new MySqlParameter("argPhotoPath", MySqlDbType.VarChar);
            pm[0].Value = model.firstname;
            pm[1].Value = model.DateOfBirth;
            pm[2].Value = model.photopath;
            cmd.Parameters.Add(pm[0]);
            cmd.Parameters.Add(pm[1]);
            cmd.Parameters.Add(pm[2]);
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                cmd.Connection = conn;
                cmd.ExecuteNonQuery();
            }
        }

        public void insertuser(string username, string password)
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.CommandText = "sp_insert_user";

            using (MySqlConnection conn = GetConnection())
            {

                conn.Open();
                cmd.Connection = conn;
                MySqlParameter[] pm = new MySqlParameter[2];
                pm[0] = new MySqlParameter("argusername", MySqlDbType.String);
                pm[1] = new MySqlParameter("argpassword", MySqlDbType.VarBinary);
                cmd.Parameters.Add(pm[0]);
                cmd.Parameters.Add(pm[1]);
                pm[0].Value = username;
              byte[] passwordbyte= System.Text.Encoding.UTF8.GetBytes(password);
                pm[1].Value = passwordbyte;
                cmd.CommandText = "sp_insert_user";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
            }
        }
        public bool getBlobData(string username,string password)
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.CommandText = "sp_get_password";
           
            using (MySqlConnection conn = GetConnection())
            {
                byte[] mybytearray = null;
                conn.Open();
                cmd.Connection = conn;
                MySqlParameter[] pm = new MySqlParameter[1];
                pm[0] = new MySqlParameter("argusername",MySqlDbType.String);
                pm[0].Value = username;
                cmd.Parameters.Add(pm[0]);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read()) {
                        // byte[] mybytearray = (byte[])reader["picture"];
                        mybytearray = (byte[])reader["password"];
                    }
                }
                var loginpassword = System.Text.Encoding.UTF8.GetBytes(password);
                if(mybytearray.Length== loginpassword.Length)
                {
                    for (int i = 0; i < mybytearray.Length; i++)
                    {
                        if(mybytearray[i]!= loginpassword[i]){
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
                
            }
            return true;
        }
    }
    
}
