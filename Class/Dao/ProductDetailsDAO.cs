using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class ProductDetailsDAO
    {
        public DataTable GetProjectDetails(String strProjectID)
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

                SqlParameter pTemp = new SqlParameter("@pProjectID", SqlDbType.NVarChar,50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strProjectID;
                param[2] = pTemp;

                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getProjectDetails", param);

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

        public DataTable InsertScore(String strProjectID, String strScore,String strUserID)
        {
            DataTable dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[5];
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

                pTemp = new SqlParameter("@pScore", SqlDbType.Int);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strScore;
                param[3] = pTemp;


                pTemp = new SqlParameter("@pUserID", SqlDbType.NVarChar, 20);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strUserID;
                param[4] = pTemp;

                DBFactory oDB = new DBFactory();
                //dt = oDB.ExecuteProcWithReturn("Transactions.insertFeedback", param);
                dt = oDB.ExecuteProcWithParamOut("Transactions.insertFeedback", param);

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

        public DataTable GetProjectFeedback(String strProjectID)
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

                SqlParameter pTemp = new SqlParameter("@pProjectID", SqlDbType.NVarChar, 50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strProjectID;
                param[2] = pTemp;

                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Transactions.getProjectFeedback", param);

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

                pTemp = new SqlParameter("@pReplyFlg", SqlDbType.NVarChar,1);
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


        public DataTable GetComment(String strProjectID,String strPage,String strReplyFlg)
        {
            DataTable dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[5];
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


                pTemp = new SqlParameter("@pPage", SqlDbType.NVarChar, 50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strPage;
                param[3] = pTemp;

                pTemp = new SqlParameter("@pReply", SqlDbType.NVarChar, 1);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strReplyFlg;
                param[4] = pTemp;



                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Transactions.getComment", param);

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



        public DataTable InsertLike(String strProjectID, String strCommentID, String strUserID)
        {
            DataTable dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[5];
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

                pTemp = new SqlParameter("@pCommentID", SqlDbType.NVarChar, 100);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strCommentID;
                param[3] = pTemp;


                pTemp = new SqlParameter("@pUserID", SqlDbType.NVarChar, 20);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strUserID;
                param[4] = pTemp;

                DBFactory oDB = new DBFactory();

                dt = oDB.ExecuteProcWithParamOut("Transactions.insertLike", param);

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


        public DataTable Getlike(String strProjectID, String strUserID)
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

                SqlParameter pTemp = new SqlParameter("@pProjectID", SqlDbType.NVarChar, 50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strProjectID;
                param[2] = pTemp;


                pTemp = new SqlParameter("@pUserID", SqlDbType.NVarChar, 20);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strUserID;
                param[3] = pTemp;


                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Transactions.getLike", param);

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

        public DataTable DeleteLike(String strLikeID)
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

                SqlParameter pTemp = new SqlParameter("@pLikeID", SqlDbType.NVarChar, 50);
                pTemp.Direction = ParameterDirection.Input;
                pTemp.Value = strLikeID;
                param[2] = pTemp;


                DBFactory oDB = new DBFactory();

                dt = oDB.ExecuteProcWithParamOut("Transactions.DeleteLike", param);

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