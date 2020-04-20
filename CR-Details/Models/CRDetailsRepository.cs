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

        public string SaveCRDetails(CRDetails cRDetails, HttpPostedFileBase attachFile)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            string message = BAL.CRDetails.AddCRDetail(cRDetails, attachFile);
            return message;
        }
    }
}