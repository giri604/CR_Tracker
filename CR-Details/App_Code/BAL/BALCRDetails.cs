using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CR_Details.BAL
{
    public class CRDetails
    {
        public CRDetails()
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
        }

        public static int AddCRDetail(CR_Details.Models.CRDetails cRDetails, HttpPostedFileBase attachFile)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.ADDCRDetail(cRDetails, attachFile);
        }
        public static int AddCRAttachFiles(int SrNo, HttpPostedFileBase attachFile)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.AddCRAttachFiles(SrNo, attachFile);
        }
        public static CR_Details.Models.CRDetails GetCRDetail(int crId)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.GetCRDetail(crId);
        }

    }
}