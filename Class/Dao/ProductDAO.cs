using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class ProductDAO
    {
        public DataTable GetDivision()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getDivision", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetKPI()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getKPIList", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetProjectList(string strDivisoin, string strKPI)
        {
            DataTable dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[4];
                SqlParameter pSqlCode = new SqlParameter("@pSqlCode", SqlDbType.VarChar, 2);
                pSqlCode.Direction = ParameterDirection.Output;
                param[0] = pSqlCode;


                SqlParameter pSqlErr = new SqlParameter("@pSqlErr", SqlDbType.VarChar, 1000);
                pSqlErr.Direction = ParameterDirection.Output;
                param[1] = pSqlErr;

                SqlParameter pTemp = new SqlParameter("@pDiv", SqlDbType.NVarChar);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strDivisoin;
                param[2] = pTemp;

                pTemp = new SqlParameter("@pKPI", SqlDbType.NVarChar);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strKPI;
                param[3] = pTemp;

                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getProjectList", param);

                // Check for errors
                string errorCode = Convert.ToString(pSqlCode.Value);
                string errorMessage = Convert.ToString(pSqlErr.Value);

                if (errorCode != "0")
                {
                    // Handle the error here
                    throw new Exception(errorMessage);
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }
    }
}