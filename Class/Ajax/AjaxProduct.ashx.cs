using mis.Class.Dao;
using mis.Class.Service;
using System;
using System.Data;
using System.Web;

namespace mis.Class.Ajax
{
    /// <summary>
    /// Summary description for AjaxProduct
    /// </summary>
    public class AjaxProduct : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string strResult = "[]";
            try
            {
                string strType = context.Request["rptType"];

                switch (strType)
                {
                    case "getdivision": strResult = this.GetDivision(); break;
                    case "getkpi": strResult = this.GetKPI(); break;
                    case "getprojectlist": strResult = this.GetProjectList(context); break;

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

        private string GetDivision()
        {
            string strResult = "[]";
            ProductDAO oRpt = new ProductDAO();
            DataTable dt = oRpt.GetDivision();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

       private string GetKPI()
        {
            string strResult = "[]";
            ProductDAO oRpt = new ProductDAO();
            DataTable dt = oRpt.GetKPI();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string GetProjectList(HttpContext context)
        {
            string strDivisoin = context.Request["strDivision"];
            string strKPI = context.Request["strKPI"];

            string strResult = "[]";
            ProductDAO oRpt = new ProductDAO();
            DataTable dt = oRpt.GetProjectList(strDivisoin, strKPI);
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