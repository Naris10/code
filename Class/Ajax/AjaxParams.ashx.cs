using mis.Class.Dao;
using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Reflection;
using System.Web;

namespace mis.Class.Ajax
{
    public class AjaxParams : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string strResult = "[]";
            try
            {
                string strType = context.Request["rptType"];

                switch (strType)
                {
                    case "getparam": strResult = this.GetRaparams(); break;


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

      

        private string GetRaparams()
        {
            string strResult = "[]";

            ParamsDAO oRpt = new ParamsDAO();
            DataTable dt = oRpt.GetInitGlobalParam();
            dt.TableName = "Params";

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