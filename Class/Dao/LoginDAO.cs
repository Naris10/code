using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class LoginDAO
    {
        public DataTable InsertLoginHistory(string strUser)
        {
            DataTable dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[3];
                SqlParameter pSqlCode = new SqlParameter("@pSqlCode", SqlDbType.VarChar, 2);
                pSqlCode.Direction = ParameterDirection.Output;
                param[0] = pSqlCode;


                SqlParameter pSqlErr = new SqlParameter("@pSqlErr", SqlDbType.VarChar, 1000);
                pSqlErr.Direction = ParameterDirection.Output;
                param[1] = pSqlErr;

                SqlParameter pTemp = new SqlParameter("@pUserID", SqlDbType.VarChar);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strUser;
                param[2] = pTemp;


                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithParamOut("Transactions.insert_login_history", param);

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