﻿using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
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
        public int ADDCRDetail(CR_Details.Models.CRDetails cRDetails, HttpPostedFileBase attachFile)
        {

            int CrIDOut = 0;
            try
            {
                m_dsCRMst = SQL.SQLLayer.ExecuteDataset(m_conn,
                                                                            null,
                                                                            "[dbo].[AddCRDetails]",
                                                                            cRDetails.CrTitle,
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
                                                                            cRDetails.ReasonRCA);
                CrIDOut = (m_dsCRMst.Tables[0].Rows[0]["SRNo"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["SRNo"])) : 0;
            }
            catch (Exception ex)
            {
                return CrIDOut;
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return CrIDOut;
        }
        #endregion

        #region "UpdateCRDetails"
        public string UpdateCRDetails(CR_Details.Models.CRDetails cRDetails, int SrNo)
        {
            try
            {
                m_dsCRMst = SQL.SQLLayer.ExecuteDataset(m_conn,
                                                                          null,
                                                                          "[dbo].[UpdateCRDetails]",
                                                                          SrNo,
                                                                          cRDetails.CrTitle,
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
                                                                          cRDetails.ReasonRCA);
                m_strmessage = "Record updated successfully";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return m_strmessage;
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
                var Filename = Path.GetFileName(attachFile.FileName);
                OutSrno = Convert.ToInt32(SQL.SQLLayer.ExecuteScalar(m_conn,
                                                null,
                                                "[dbo].AddCRAttachments",
                                                SrNo,
                                                Filename,
                                                attachFile.ContentType,
                                                bytes));
            }
            catch (Exception ex)
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
            DateTime validValue;
            CR_Details.Models.CRDetails cRDetail = new Models.CRDetails();
            try
            {
                m_dsCRMst = SQL.SQLLayer.ExecuteDataset(m_conn, null, "GetCRDetail", crId);
                if (m_dsCRMst.Tables.Count > 0)
                {
                    //Add more Fields here
                    cRDetail.CrTitle = (m_dsCRMst.Tables[0].Rows[0]["CrTitle"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["CrTitle"])) : string.Empty;
                    cRDetail.SrNo = (m_dsCRMst.Tables[0].Rows[0]["SrNo"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["SrNo"])) : 0;
                    cRDetail.CrDescription = (m_dsCRMst.Tables[0].Rows[0]["CrDescription"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["CrDescription"])) : string.Empty;
                    if (m_dsCRMst.Tables[0].Rows[0]["ComplexityList"] != DBNull.Value)
                    {
                        var complexType = (Models.Complexity)Enum.Parse(typeof(Models.Complexity), Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["ComplexityList"]));
                        cRDetail.ComplexityList = complexType;
                    }

                    if (m_dsCRMst.Tables[0].Rows[0]["DepartmentList"] != DBNull.Value)
                    {
                        var departmentType = (Models.Department)Enum.Parse(typeof(Models.Department), Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["DepartmentList"]));
                        cRDetail.DepartmentList = departmentType;
                    }
                    if (m_dsCRMst.Tables[0].Rows[0]["CategoryList"] != DBNull.Value)
                    {
                        var categoryType = (Models.Category)Enum.Parse(typeof(Models.Category), Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["CategoryList"]));
                        cRDetail.CategoryList = categoryType;
                    }
                    cRDetail.ProjectCompletedSchedule = (m_dsCRMst.Tables[0].Rows[0]["ProjectCompletedSchedule"] != DBNull.Value) ? (Convert.ToBoolean(m_dsCRMst.Tables[0].Rows[0]["ProjectCompletedSchedule"])) : (Boolean?)null;
                    //cRDetail.KeyProjects = (m_dsCRMst.Tables[0].Rows[0]["KeyProjects"] != DBNull.Value) ? (Convert.ToBoolean(m_dsCRMst.Tables[0].Rows[0]["KeyProjects"])) : false;
                    cRDetail.KeyProjects = (m_dsCRMst.Tables[0].Rows[0]["KeyProjects"] != DBNull.Value) ? (Convert.ToBoolean(m_dsCRMst.Tables[0].Rows[0]["KeyProjects"])) : (Boolean?)null;

                    //cRDetail.ProjectCRReceivedDate = (m_dsCRMst.Tables[0].Rows[0]["ProjectCRReceivedDate"] != DBNull.Value) ? (Convert.ToDateTime(m_dsCRMst.Tables[0].Rows[0]["ProjectCRReceivedDate"]).Date) : DateTime.MinValue;
                    cRDetail.ProjectCRReceivedDate = DateTime.TryParse(Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["ProjectCRReceivedDate"]), out validValue) ? validValue : (DateTime?)null;
                    cRDetail.FinalProjectCRReceivedDate = DateTime.TryParse(Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["FinalProjectCRReceivedDate"]), out validValue) ? validValue : (DateTime?)null;
                    cRDetail.NoOfCRReceivedDuringUAT = (m_dsCRMst.Tables[0].Rows[0]["NoOfCRReceivedDuringUAT"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["NoOfCRReceivedDuringUAT"])) : 0;
                    cRDetail.UATDeliveryDate = DateTime.TryParse(Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["UATDeliveryDate"]), out validValue) ? validValue : (DateTime?)null;
                    cRDetail.UATSignoffDate = DateTime.TryParse(Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["UATSignoffDate"]), out validValue) ? validValue : (DateTime?)null;
                    cRDetail.ProjectCRLiveDate = DateTime.TryParse(Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["ProjectCRLiveDate"]), out validValue) ? validValue : (DateTime?)null;
                    cRDetail.FirstCommittedLiveDate = DateTime.TryParse(Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["FirstCommittedLiveDate"]), out validValue) ? validValue : (DateTime?)null;
                    cRDetail.TAT = (m_dsCRMst.Tables[0].Rows[0]["TAT"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["TAT"])) : string.Empty;
                    cRDetail.NoOfShowstoppersPostGoLive = (m_dsCRMst.Tables[0].Rows[0]["NoOfShowstoppersPostGoLive"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["NoOfShowstoppersPostGoLive"])) : 0;
                    if (m_dsCRMst.Tables[0].Rows[0]["UnitLead"] != DBNull.Value)
                    {
                        var leadType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["UnitLead"]));
                        cRDetail.UnitLead = leadType;
                    }
                    if (m_dsCRMst.Tables[0].Rows[0]["Manager"] != DBNull.Value)
                    {
                        var managerType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["Manager"]));
                        cRDetail.Manager = managerType;
                    }
                    cRDetail.ReasonRCA = (m_dsCRMst.Tables[0].Rows[0]["ReasonRCA"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["ReasonRCA"])) : string.Empty;
                    cRDetail.AttachFileId = (m_dsCRMst.Tables[0].Rows[0]["AttachFileId"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["AttachFileId"])) : 0;
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

        #region "GetCRAttachments"
        //getCRAttachFiles(AttachFileId)
        public List<CR_Details.Models.CRAttachFiles> getCRAttachFiles(int? AttachFileId)
        {
            List<CR_Details.Models.CRAttachFiles> cRAttachFiles = new List<Models.CRAttachFiles>();
            CR_Details.Models.CRAttachFiles cRAttach = null;
            try
            {
                m_dsCRMst = SQL.SQLLayer.ExecuteDataset(m_conn, null, "GetCRAttachFiles", AttachFileId);
                if (m_dsCRMst.Tables.Count > 0)
                {
                    for (int i = 0; i <= m_dsCRMst.Tables.Count; i++)
                    {
                        cRAttach = new Models.CRAttachFiles();
                        cRAttach.FileID = (m_dsCRMst.Tables[0].Rows[i]["FileID"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[i]["FileID"])) : 0;
                        cRAttach.SrNo = (m_dsCRMst.Tables[0].Rows[i]["SrNo"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[i]["SrNo"])) : 0;
                        cRAttach.FileName = (m_dsCRMst.Tables[0].Rows[i]["FileName"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[i]["FileName"])) : string.Empty;
                        cRAttach.ContentType = (m_dsCRMst.Tables[0].Rows[i]["ContentType"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[i]["ContentType"])) : string.Empty;
                        //var data = (byte[])m_dsCRMst.Tables[0].Rows[0]["ContentType"]; Encoding.UTF8.GetBytes
                        //cRAttach.AttachDocument = (m_dsCRMst.Tables[0].Rows[i]["ContentType"] != DBNull.Value) ? (byte[])m_dsCRMst.Tables[0].Rows[i]["ContentType"] : null;
                        cRAttach.AttachDocument = (m_dsCRMst.Tables[0].Rows[i]["ContentType"] != DBNull.Value) ? Encoding.UTF8.GetBytes(m_dsCRMst.Tables[0].Rows[i]["ContentType"].ToString()) : null;

                        cRAttachFiles.Add(cRAttach);
                    }

                }
                else
                {
                    cRAttachFiles = null;
                }

            }
            catch (Exception ex)
            {

                return cRAttachFiles;
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return cRAttachFiles;
        }
        #endregion

        #region "getCRAttachFile"
        public CR_Details.Models.CRAttachFiles getCRAttachFile(int? FileId)
        {
            CR_Details.Models.CRAttachFiles cRAttach = null;
            try
            {
                m_dsCRMst = SQL.SQLLayer.ExecuteDataset(m_conn, null, "GetCRAttachFile", FileId);
                if (m_dsCRMst.Tables.Count > 0)
                {
                    cRAttach = new Models.CRAttachFiles();
                    cRAttach.FileID = (m_dsCRMst.Tables[0].Rows[0]["FileID"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["FileID"])) : 0;
                    cRAttach.SrNo = (m_dsCRMst.Tables[0].Rows[0]["SrNo"] != DBNull.Value) ? (Convert.ToInt32(m_dsCRMst.Tables[0].Rows[0]["SrNo"])) : 0;
                    cRAttach.FileName = (m_dsCRMst.Tables[0].Rows[0]["FileName"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["FileName"])) : string.Empty;
                    cRAttach.ContentType = (m_dsCRMst.Tables[0].Rows[0]["ContentType"] != DBNull.Value) ? (Convert.ToString(m_dsCRMst.Tables[0].Rows[0]["ContentType"])) : string.Empty;
                    //var data = (byte[])m_dsCRMst.Tables[0].Rows[0]["ContentType"]; Encoding.UTF8.GetBytes
                    //cRAttach.AttachDocument = (m_dsCRMst.Tables[0].Rows[0]["ContentType"] != DBNull.Value) ? (byte[])m_dsCRMst.Tables[0].Rows[0]["ContentType"] : null;
                    cRAttach.AttachDocument = (m_dsCRMst.Tables[0].Rows[0]["ContentType"] != DBNull.Value) ? Encoding.UTF8.GetBytes(m_dsCRMst.Tables[0].Rows[0]["ContentType"].ToString()) : null;
                }
                else
                {
                    cRAttach = null;
                }
            }
            catch (Exception ex)
            {

                return cRAttach;
            }
            finally
            {
                SQL.SQLLayer.CloseConnection(m_conn);
            }
            return cRAttach;
        }
        #endregion
    }
}