using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class ParamsDAO
    {
        public DataTable GetInitGlobalParam()
        {
            DataTable dt = new DataTable();

            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.sps_GetInitGlobalParam", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return dt;
        }
    }
}