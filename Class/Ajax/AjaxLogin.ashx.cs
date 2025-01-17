using mis.Class.Dao;
using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.DirectoryServices.Protocols;
using System.Net;

namespace mis.Class.Ajax
{
    /// <summary>
    /// Summary description for AjaxLogin
    /// </summary>
    public class AjaxLogin : IHttpHandler
    {
        private object Session;

        public void ProcessRequest(HttpContext context)
        {
            string strResult = "[]";
            try
            {
                string strType = context.Request["rptType"];
                string strUserName = context.Request["strUserName"];
                string strPassword = context.Request["strPassword"];


                switch (strType)
                {
                    case "login": strResult = this.AuthenLogin(strUserName, strPassword); break;
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


        private string AuthenLogin(string strUser, string strPass)
        {
            //reture 0 when "PASS"
            //return -1 when "NOT PASS"
            string strResult = "[]"; //Not yet in flow
            try
            {

                // Authentication
                
                //if need by pass login comment line 63-67
                /*
                LdapConnection lcon = new LdapConnection(new LdapDirectoryIdentifier((String)null, false, false));
                            NetworkCredential nc = new NetworkCredential(strUser, strPass, Environment.UserDomainName);
                            lcon.Credential = nc;
                            lcon.AuthType = AuthType.Negotiate;
                lcon.Bind(nc);*/
                
                

                // Insert History Login and Get User Name
                LoginDAO oRpt = new LoginDAO();
                DataTable dt = oRpt.InsertLoginHistory(strUser);
                dt.TableName = "ResultTable";

                JSonFactory oJSon = new JSonFactory();
                strResult = oJSon.setJSonSuccessMsg(dt);

               
            }
            catch (LdapException)
            {
                JSonFactory oJSon = new JSonFactory();
                strResult = oJSon.setJSonErrorMsg("Login Fail");
            }
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