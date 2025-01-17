using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class MasterDAO
    {
        public DataTable GetContact()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getIotMember", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }
        public DataTable GetManual()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getManual", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable InsertComment(String strProjectID, String strReplyFlg, String strReplyCommentID, String strPage, String strComment, String strUserID)
        {
            DataTable dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[8];
                SqlParameter pSqlCode = new SqlParameter("@pSqlCode", SqlDbType.VarChar, 2);
                pSqlCode.Direction = ParameterDirection.Output;
                param[0] = pSqlCode;


                SqlParameter pSqlErr = new SqlParameter("@pSqlErr", SqlDbType.VarChar, 1000);
                pSqlErr.Direction = ParameterDirection.Output;
                param[1] = pSqlErr;

                SqlParameter pTemp = new SqlParameter("@pProjectID", SqlDbType.NVarChar, 50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strProjectID;
                param[2] = pTemp;

                pTemp = new SqlParameter("@pReplyFlg", SqlDbType.NVarChar, 1);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strReplyFlg;
                param[3] = pTemp;


                pTemp = new SqlParameter("@pReplyCommentID", SqlDbType.NVarChar, 100);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strReplyCommentID;
                param[4] = pTemp;

                pTemp = new SqlParameter("@pPage", SqlDbType.NVarChar, 50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strPage;
                param[5] = pTemp;

                pTemp = new SqlParameter("@pComment", SqlDbType.NVarChar, 1000);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strComment;
                param[6] = pTemp;

                pTemp = new SqlParameter("@pUserID", SqlDbType.NVarChar, 20);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strUserID;
                param[7] = pTemp;

                DBFactory oDB = new DBFactory();

                dt = oDB.ExecuteProcWithParamOut("Transactions.insertComment", param);

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