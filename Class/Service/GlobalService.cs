using mis.Class.Dao;
using mis.Class.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Service
{
    public class GlobalService
    {
        public void LoadInitGlobalParam()
        {
            try
            {
                ParamsDAO oParam = new ParamsDAO();
                DataTable dt = oParam.GetInitGlobalParam();

                if (dt.Rows.Count > 0)
                {
                    GlobalBean.VERSION_CONTROL = "?v=" + ConvertToString(dt.Rows[0]["VERSION_CONTROL"]);
                    GlobalBean.PICTURES_PATH = ConvertToString(dt.Rows[0]["PICTURE_PATH"]);
                    GlobalBean.MANUAL_PATH = ConvertToString(dt.Rows[0]["MANUAL_PATH"]);
                }
            }
            catch
            { }
        }

        public static string ConvertToString(object oData)
        {
            string strData = string.Empty;

            if ((oData != null) && (oData != DBNull.Value))
            {
                strData = Convert.ToString(oData).Trim();
            }

            return strData;
        }

        public static int ConvertToInt(object oData)
        {
            int iData = 0;

            try
            {
                if ((oData != null) && (oData != DBNull.Value))
                {
                    iData = Convert.ToInt32(oData);
                }
            }
            catch
            {
                iData = 0;
            }

            return iData;
        }
    }
}