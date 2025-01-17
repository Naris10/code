using mis.Class.Service;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace mis.Class.Dao
{
    public class HomeDAO
    {

        public DataTable GetIotmember()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getIotMember", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }


      

        public DataTable GetProjectDeployed()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getProjectDeploy", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }



        public DataTable GetReduceTime()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getProjectReduceTime", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetPieData()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getPieData", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetBarData()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getBarData", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }


        public DataTable GetFeedData()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getNewFeed", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetVisitor()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getVisitor", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetDescription()
        {
            DataTable dt = null;
            try
            {
                DBFactory oDB = new DBFactory();
                dt = oDB.ExecuteProcWithReturn("Master.getDescription", null);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

    }
}