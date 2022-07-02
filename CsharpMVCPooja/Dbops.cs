using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using CsharpMVCPooja.Models;

namespace CsharpMVCPooja
{
    
    public static class Dbops
    {
        public static IConfiguration _config;
        public static string ConnectionString = "";
        private static MySqlConnection con = null;
        public static void saveemp(Employee model)
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
        public static MySqlConnection GetConnection()
        {
            
            ConnectionString = _config.GetSection("MySettings:DbConnection").Value;
            con = new MySqlConnection(ConnectionString);
            return con;
        }

    }
}
