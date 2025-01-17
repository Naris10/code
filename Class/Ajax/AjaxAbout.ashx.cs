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
    /// Summary description for AjaxAbout
    /// </summary>
    public class AjaxAbout : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string strResult = "[]";
            try
            {
                string strType = context.Request["rptType"];

                switch (strType)
                {
                    case "getiotmember": strResult = this.GetIotMember(); break;
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


        private string GetIotMember()
        {
            string strResult = "[]";
            AboutDAO oRpt = new AboutDAO();
            DataTable dt = oRpt.GetIotmember();
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