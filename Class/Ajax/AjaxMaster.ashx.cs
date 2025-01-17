using mis.Class.Dao;
using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Ajax
{
    /// <summary>
    /// Summary description for AjaxMaster
    /// </summary>
    public class AjaxMaster : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string strResult = "[]";
            try
            {
                string strType = context.Request["rptType"];

                switch (strType)
                {
                    case "getcontact": strResult = this.GetContact(); break;
                    case "getmanual": strResult = this.GetManual(); break;
                    case "insertcomment": strResult = this.InsertComment(context); break;
                }

            }
            catch (Exception ex)
            {
                JSonFactory oJSon = new JSonFactory();
                strResult = oJSon.setJSonErrorMsg(ex);
            }
            finally
            {
                context.Response.CacheControl = "no-cache";
                context.Response.ContentType = "application/json";
                context.Response.Write(strResult);
                context.Response.End();
            }
        }

        private string GetContact()
        {
            string strResult = "[]";
            MasterDAO oRpt = new MasterDAO();
            DataTable dt = oRpt.GetContact();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string GetManual()
        {
            string strResult = "[]";
            MasterDAO oRpt = new MasterDAO();
            DataTable dt = oRpt.GetManual();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string InsertComment(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];
            string strUserID = context.Request["strUserID"];
            string strComment = context.Request["strComment"];
            string strPage = context.Request["strPage"];
            string strReplyFlg = context.Request["strReplyFlg"];
            string strReplyCommentID = context.Request["strReplyCommentID"];

            string strResult = "[]";
            MasterDAO oRpt = new MasterDAO();
            DataTable dt = oRpt.InsertComment(strProjectID, strReplyFlg, strReplyCommentID, strPage, strComment, strUserID);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}