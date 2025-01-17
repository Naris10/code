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
    /// Summary description for AjaxProductDetails
    /// </summary>
    public class AjaxProductDetails : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string strResult = "[]";
            try
            {
                string strType = context.Request["rptType"];

                switch (strType)
                {
                    case "getprojectdetails": strResult = this.GetProjectDetails(context); break;
                    case "insertscore": strResult = this.InsertScore(context); break;
                    case "getprojectfeedback": strResult = this.GetProjectFeedback(context); break;
                    case "insertcomment": strResult = this.InsertComment(context); break;
                    case "getcomment": strResult = this.GetComment(context); break;
                    case "insertlike": strResult = this.InsertLike(context); break;
                    case "getlike": strResult = this.Getlike(context); break;
                    case "deletelike": strResult = this.DeleteLike(context); break;


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

        private string GetProjectDetails(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.GetProjectDetails(strProjectID);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }
        


        private string InsertScore(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];
            string strScore = context.Request["strScore"];
            string strUserID = context.Request["strUserID"];

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.InsertScore(strProjectID, strScore, strUserID);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }


        private string GetProjectFeedback(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.GetProjectFeedback(strProjectID);
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
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.InsertComment(strProjectID, strReplyFlg, strReplyCommentID, strPage, strComment, strUserID);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }


        private string GetComment(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];
            string strPage = context.Request["strPage"];
            string strReplyFlg = context.Request["strReplyFlg"];

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.GetComment(strProjectID,strPage, strReplyFlg);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string InsertLike(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];
            string strCommentID = context.Request["strCommentID"];
            string strUserID = context.Request["strUserID"];

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.InsertLike(strProjectID, strCommentID, strUserID);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }

        private string Getlike(HttpContext context)
        {
            string strProjectID = context.Request["strProjectID"];
            string strUserID = context.Request["strUserID"];
       

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.Getlike(strProjectID, strUserID);
            dt.TableName = "ResultTable";

            JSonFactory oJSon = new JSonFactory();
            strResult = oJSon.setJSonSuccessMsg(dt);

            return strResult;

        }


        
        private string DeleteLike(HttpContext context)
        {
            string strLikeID = context.Request["strLikeID"];

            string strResult = "[]";
            ProductDetailsDAO oRpt = new ProductDetailsDAO();
            DataTable dt = oRpt.DeleteLike(strLikeID);
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