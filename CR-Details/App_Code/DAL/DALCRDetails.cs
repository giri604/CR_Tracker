using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace CR_Details.DAL
{
    public class CRDetails
    {
        static SqlConnection m_conn;
        static DataSet m_dsAccMsts;
        static DataSet m_dsCRMst;
        static DataSet m_dsBalSheet;
        static DataSet m_dsBalSheet1;
        static string m_strmessage;

        public CRDetails()
        {
            m_conn = SQL.SQLLayer.OpenConnection();
        }

        #region "ADDCRDetail"
        public string ADDCRDetail(CR_Details.Models.CRDetails cRDetails, HttpPostedFileBase attachFile)
        {
            try
            {
                m_strmessage = Convert.ToString(SQL.SQLLayer.ExecuteNonQuery(m_conn,
                                                                            null,
                                                                            "[dbo].[AddCRDetails]",
                                                                            cRDetails.CrDescription,
                                                                            cRDetails.ComplexityList,
                                                                            cRDetails.DepartmentList,
                                                                            cRDetails.CategoryList,
                                                                            cRDetails.ProjectCompletedSchedule,
                                                                            cRDetails.KeyProjects,
                                                                            cRDetails.ProjectCRReceivedDate,
                                                                            cRDetails.FinalProjectCRReceivedDate,
                                                                            cRDetails.NoOfCRReceivedDuringUAT,
                                                                            cRDetails.UATDeliveryDate,
                                                                            cRDetails.UATSignoffDate,
                                                                            cRDetails.ProjectCRLiveDate,
                                                                            cRDetails.FirstCommittedLiveDate,
                                                                            cRDetails.TAT,
                                                                            cRDetails.NoOfShowstoppersPostGoLive,
                                                                            cRDetails.UnitLead,
                                                                            cRDetails.Manager,
                                                                            cRDetails.ReasonRCA
                                                                            ));
                m_strmessage = "CR Detail Record Added Succesfully";
            }
            catch (Exception)
            {

                m_strmessage = "Error in Writing Cr Detail Record";
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return (m_strmessage);
        }
        #endregion

        #region "AddCRAttachFiles"
        public int AddCRAttachFiles(int SrNo, HttpPostedFileBase attachFile)
        {
            int OutSrno = 0;
            byte[] bytes;
            using (BinaryReader br = new BinaryReader(attachFile.InputStream))
            {
                bytes = br.ReadBytes(attachFile.ContentLength);
            }
            try
            {
                OutSrno = Convert.ToInt32(SQL.SQLLayer.ExecuteScalar(m_conn,
                                                null,
                                                "[dbo].AddCRAttachments",
                                                SrNo,
                                                Path.GetFileName(attachFile.FileName),
                                                attachFile.ContentType,
                                                bytes));
            }
            catch (Exception)
            {

                OutSrno = 0;
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return OutSrno;
        }
        #endregion

        #region "GetCRDetail"
        public CR_Details.Models.CRDetails GetCRDetail(int crId)
        {
            CR_Details.Models.CRDetails cRDetail = new Models.CRDetails();
            try
            {
                m_dsCRMst = SQL.SQLLayer.ExecuteDataset(m_conn, null, "GetCRDetail", crId);
                if (m_dsCRMst.Tables.Count > 0)
                {
                    //Add more Fields here
                    cRDetail.SrNo = (m_dsCRMst.Tables[0].Rows[0]["SrNo"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["SrNo"])) : 0;

                }
                else
                {
                    cRDetail.SrNo = 0;
                }
            }
            catch (Exception ex)
            {
                cRDetail.SrNo = 0;
                return cRDetail;
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return cRDetail;
        }
        #endregion
    }
}