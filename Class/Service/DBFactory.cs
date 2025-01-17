using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using mis.Class.Model;

namespace mis.Class.Service
{
    
    public class DBFactory
    {
        private string _strKey = "TS9hV1cLaU7P";

        #region Method
        public SqlConnection OpenConnection()
        {
            
            if (GlobalBean.MIS_CONN_STR != Decrypt(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString))
            {
                GlobalBean.MIS_CONN_STR = Decrypt(ConfigurationManager.ConnectionStrings["DBConnection"].ConnectionString);
            }

            SqlConnection conn = new SqlConnection(GlobalBean.MIS_CONN_STR);
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }

            return conn;
        }
        public void CloseConnection(SqlConnection conn)
        {
            if (conn != null)
            {
                conn.Close();
                conn.Dispose();
            }
        }

        public object ExecuteScalar(string strSQL)
        {
            object oData = null;
            SqlConnection conn = null;

            try
            {
                conn = OpenConnection();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = strSQL;

                oData = cmd.ExecuteScalar();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }

            return oData;
        }

        public DataTable ExecuteQuery(string strSQL)
        {
            SqlConnection conn = null;
            DataTable dt = new DataTable();

            try
            {
                conn = OpenConnection();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = strSQL;

                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }

            return dt;
        }

        public int ExecuteNonQuery(string strSQL)
        {
            int iExcute = 0;
            SqlConnection conn = null;

            try
            {
                conn = OpenConnection();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = strSQL;

                iExcute = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }

            return iExcute;
        }

        public void ExecuteProc(string strProcedureName, params SqlParameter[] paramLists)
        {

            SqlConnection conn = null;

            try
            {
                conn = OpenConnection();
                SqlCommand cmd = new SqlCommand(strProcedureName, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                if (paramLists != null)
                {
                    if (paramLists.Length > 0)
                    {
                        cmd.Parameters.AddRange(paramLists);
                    }
                }

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }
        }



        public DataTable ExecuteProcWithReturn(string strProcedureName, params SqlParameter[] paramLists)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = null;

            try
            {
                conn = OpenConnection();
                SqlCommand cmd = new SqlCommand(strProcedureName, conn);
                cmd.CommandType = CommandType.StoredProcedure;

                if (paramLists != null)
                {
                    if (paramLists.Length > 0)
                    {
                        cmd.Parameters.AddRange(paramLists);
                    }
                }

                dt.Load(cmd.ExecuteReader());
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }

            return dt;
        }

        public DataTable ExecuteProcWithParamOut(string strProcedureName, params SqlParameter[] paramLists)
        {
            DataTable dt = new DataTable();
            SqlConnection conn = null;

            try
            {
                int i = 0;
                conn = OpenConnection();

                SqlCommand cmd = new SqlCommand(strProcedureName, conn);
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;

                if (paramLists != null)
                {
                    for (i = 0; i < paramLists.Length; i++)
                    {
                        if (paramLists[i].Direction == ParameterDirection.Output)
                        {
                            dt.Columns.Add(paramLists[i].ParameterName, this.GetDataTableDbType(paramLists[i].SqlDbType));
                        }
                        cmd.Parameters.Add(paramLists[i]);
                    }
                }
                cmd.ExecuteNonQuery();

                DataRow dr = dt.NewRow();
                for (i = 0; i < dt.Columns.Count; i++)
                {
                    dr[dt.Columns[i].ColumnName] = cmd.Parameters[dt.Columns[i].ColumnName].Value.ToString();
                }
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }

            return dt;
        }

        private Type GetDataTableDbType(SqlDbType oDBType)
        {
            Type pType = null;

            switch (oDBType)
            {
                case SqlDbType.Decimal: pType = typeof(decimal); break;
                case SqlDbType.Float: pType = typeof(double); break;
                case SqlDbType.Real: pType = typeof(Single); break;
                case SqlDbType.SmallInt: pType = typeof(Int16); break;
                case SqlDbType.Int: pType = typeof(Int32); break;
                case SqlDbType.BigInt: pType = typeof(Int64); break;
                default: pType = typeof(string); break;
            }

            return pType;
        }

        public string Encrypt(string PlainText) //การเข้ารหัส
        {
            string strData = "";

            try
            {
                string Salt = "Kosher";
                string HashAlgorithm = "SHA1";
                int PasswordIterations = 2;
                string InitialVector = "OFRna73m*aze01xY";
                int KeySize = 256;
                if (string.IsNullOrEmpty(PlainText))
                    return "";
                byte[] InitialVectorBytes = Encoding.ASCII.GetBytes(InitialVector);
                byte[] SaltValueBytes = Encoding.ASCII.GetBytes(Salt);
                byte[] PlainTextBytes = Encoding.UTF8.GetBytes(PlainText);
                PasswordDeriveBytes DerivedPassword = new PasswordDeriveBytes(this._strKey, SaltValueBytes, HashAlgorithm, PasswordIterations);
                byte[] KeyBytes = DerivedPassword.GetBytes(KeySize / 8);
                RijndaelManaged SymmetricKey = new RijndaelManaged();
                SymmetricKey.Mode = CipherMode.CBC;
                byte[] CipherTextBytes = null;
                using (ICryptoTransform Encryptor = SymmetricKey.CreateEncryptor(KeyBytes, InitialVectorBytes))
                {
                    using (MemoryStream MemStream = new MemoryStream())
                    {
                        using (CryptoStream CryptoStream = new CryptoStream(MemStream, Encryptor, CryptoStreamMode.Write))
                        {
                            CryptoStream.Write(PlainTextBytes, 0, PlainTextBytes.Length);
                            CryptoStream.FlushFinalBlock();
                            CipherTextBytes = MemStream.ToArray();
                            MemStream.Close();
                            CryptoStream.Close();
                        }
                    }
                }
                SymmetricKey.Clear();
                strData = Convert.ToBase64String(CipherTextBytes);
            }
            catch
            {
                strData = "";
            }

            return strData;
        }

        public string Decrypt(string CipherText) //การถอดรหัส
        {
            string strData = "";

            try
            {

                string Salt = "Kosher";
                string HashAlgorithm = "SHA1";
                int PasswordIterations = 2;
                string InitialVector = "OFRna73m*aze01xY";
                int KeySize = 256;
                if (string.IsNullOrEmpty(CipherText))
                    return "";
                byte[] InitialVectorBytes = Encoding.ASCII.GetBytes(InitialVector);
                byte[] SaltValueBytes = Encoding.ASCII.GetBytes(Salt);
                byte[] CipherTextBytes = Convert.FromBase64String(CipherText);
                PasswordDeriveBytes DerivedPassword = new PasswordDeriveBytes(this._strKey, SaltValueBytes, HashAlgorithm, PasswordIterations);
                byte[] KeyBytes = DerivedPassword.GetBytes(KeySize / 8);
                RijndaelManaged SymmetricKey = new RijndaelManaged();
                SymmetricKey.Mode = CipherMode.CBC;
                byte[] PlainTextBytes = new byte[CipherTextBytes.Length];
                int ByteCount = 0;
                using (ICryptoTransform Decryptor = SymmetricKey.CreateDecryptor(KeyBytes, InitialVectorBytes))
                {
                    using (MemoryStream MemStream = new MemoryStream(CipherTextBytes))
                    {
                        using (CryptoStream CryptoStream = new CryptoStream(MemStream, Decryptor, CryptoStreamMode.Read))
                        {

                            ByteCount = CryptoStream.Read(PlainTextBytes, 0, PlainTextBytes.Length);
                            MemStream.Close();
                            CryptoStream.Close();
                        }
                    }
                }
                SymmetricKey.Clear();
                strData = Encoding.UTF8.GetString(PlainTextBytes, 0, ByteCount);
            }
            catch
            {
                strData = "";
            }

            return strData;
        }

        #endregion

    
    }
}