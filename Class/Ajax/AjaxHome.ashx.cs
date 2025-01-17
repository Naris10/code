using mis.Class.Dao;
using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.UI.WebControls;

namespace mis.Class.Ajax
{
    /// <summary>
    /// Summary description for AjaxBasicSQL
    /// </summary>
    public class AjaxBasicSQL : IHttpHandler
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
                    case "getprojectdeployed": strResult = this.GetProjectDeployed(); break;
                    case "getreducetime": strResult = this.GetReduceTime(); break;
                    case "getpiedata": strResult = this.GetPieData(); break;
                    case "getbardata": strResult = this.GetBarData(); break;
                    case "getfeeddata": strResult = this.GetFeedData(); break;
                    case "getvisitor": strResult = this.GetVisitor(); break;
                    case "getdescription": strResult = this.GetDescription(); break;
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

        private string GetIotMember() { 
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetIotmember();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }
     

        private string GetProjectDeployed()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetProjectDeployed();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        

       private string GetReduceTime()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetReduceTime();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }


        private string GetPieData()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetPieData();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string GetBarData()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetBarData();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }
        
       private string GetFeedData()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetFeedData();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }


        private string GetVisitor()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetVisitor();
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string GetDescription()
        {
            string strResult = "[]";
            HomeDAO oRpt = new HomeDAO();
            DataTable dt = oRpt.GetDescription();
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