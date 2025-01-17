using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class AboutDAO
    {
          public DataTable GetIotmember()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getContact", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }
    }
}