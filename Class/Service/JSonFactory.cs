using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Service
{
    public class JSonFactory
    {
        public string setJSonSuccessMsg(string strSuccess)
        {
            string strResult = "[]";

            try
            {
                DataTable dt = new DataTable();
                dt.TableName = "Result";
                dt.Columns.Add("Code");
                dt.Columns.Add("Desc");
                dt.Rows.Add("0", strSuccess);

                DataSet ds = new DataSet();
                ds.Tables.Add(dt);

                strResult = JsonConvert.SerializeObject(ds, Formatting.Indented);
            }
            catch (Exception ex)
            {
                strResult = setJSonErrorMsg(ex);
            }

            return strResult;
        }

        public string setJSonSuccessMsg(params DataTable[] paramDatables)
        {
            string strResult = "[]";

            try
            {
                int i = 0;
                DataTable dt = new DataTable();
                dt.TableName = "Result";
                dt.Columns.Add("Code");
                dt.Columns.Add("Desc");
                dt.Rows.Add("0", "");

                DataSet ds = new DataSet();
                ds.Tables.Add(dt);

                if (paramDatables != null)
                {
                    for (i = 0; i < paramDatables.Length; i++)
                    {
                        ds.Tables.Add(paramDatables[i]);
                    }
                }

                strResult = JsonConvert.SerializeObject(ds, Formatting.Indented);
            }
            catch (Exception ex)
            {
                strResult = setJSonErrorMsg(ex);
            }

            return strResult;
        }

        public string setJSonWarningMsg(string strWarning)
        {
            string strResult = "[]";

            try
            {
                DataTable dt = new DataTable();
                dt.TableName = "Result";
                dt.Columns.Add("Code");
                dt.Columns.Add("Desc");
                dt.Rows.Add("1", strWarning);

                DataSet ds = new DataSet();
                ds.Tables.Add(dt);

                strResult = JsonConvert.SerializeObject(ds, Formatting.Indented);
            }
            catch (Exception ex)
            {
                strResult = setJSonErrorMsg(ex);
            }

            return strResult;
        }

        public string setJSonErrorMsg(Exception e)
        {
            string strResult = "[]";

            try
            {
                string strErrMsg = e.Message;

                if (strErrMsg == null)
                {
                    strErrMsg = e.ToString();
                }

                DataTable dt = new DataTable();
                dt.TableName = "Result";
                dt.Columns.Add("Code");
                dt.Columns.Add("Desc");
                dt.Rows.Add("-1", strErrMsg);

                DataSet ds = new DataSet();
                ds.Tables.Add(dt);

                strResult = JsonConvert.SerializeObject(ds, Formatting.Indented);
            }
            catch (Exception ex)
            {
                strResult = "{\"Result\": [{\"Code\": \"-1\", \"Desc\": \"" + ex.Message + "\"}] }";
            }

            return strResult;
        }

        public string setJSonErrorMsg(String e)
        {
            string strResult = "[]";

            try
            {
                string strErrMsg = e;

                if (strErrMsg == null)
                {
                    strErrMsg = e.ToString();
                }

                DataTable dt = new DataTable();
                dt.TableName = "Result";
                dt.Columns.Add("Code");
                dt.Columns.Add("Desc");
                dt.Rows.Add("-1", strErrMsg);

                DataSet ds = new DataSet();
                ds.Tables.Add(dt);

                strResult = JsonConvert.SerializeObject(ds, Formatting.Indented);
            }
            catch (Exception ex)
            {
                strResult = "{\"Result\": [{\"Code\": \"-1\", \"Desc\": \"" + ex.Message + "\"}] }";
            }

            return strResult;
        }

    }
}