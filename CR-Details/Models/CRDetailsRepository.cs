using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CR_Details.Models
{
    public class CRDetailsRepository : ICRDetailsRepository
    {
        static DataSet m_dsCrDetail;

        public CRAttachFiles getCRAttachFile(int? FileId)
        {
            CRAttachFiles CRAttachFiles = new CRAttachFiles();
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            CRAttachFiles = BAL.CRDetails.getCRAttachFile(FileId);
            return CRAttachFiles;
        }

        public List<CRAttachFiles> getCRAttachFiles(int? AttachFileId)
        {
            List<CRAttachFiles> CRAttachFiles = new List<CRAttachFiles>();
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            CRAttachFiles = BAL.CRDetails.getCRAttachFiles(AttachFileId);
            return CRAttachFiles;
        }

        public CRDetails GetRDetail(int crId)
        {
            CRDetails cRDetails = new CRDetails();
            BAL.CRDetails BalCRDetail = new BAL.CRDetails();
            cRDetails = BAL.CRDetails.GetCRDetail(crId);
            return cRDetails;
        }

        public int SaveCRAttachFiles(int SrNo, HttpPostedFileBase attachFile)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            int message = BAL.CRDetails.AddCRAttachFiles(SrNo, attachFile);
            return message;
        }

        public int SaveCRDetails(CRDetails cRDetails, HttpPostedFileBase attachFile)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            int message = BAL.CRDetails.AddCRDetail(cRDetails, attachFile);
            return message;
        }

        public string UpdateCRDetails(CRDetails cRDetails, int SrNo)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            string message = BAL.CRDetails.UpdateCRDetails(cRDetails, SrNo);
            return message;
        }
    }
}