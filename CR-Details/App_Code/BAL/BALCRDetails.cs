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
    
        public static string UpdateCRDetails(CR_Details.Models.CRDetails cRDetails, int CR_ID)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.UpdateCRDetails(cRDetails, CR_ID);
        }
        public static int AddCRAttachFiles(int CR_ID, HttpPostedFileBase attachFile)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.AddCRAttachFiles(CR_ID, attachFile);
        }
        public static CR_Details.Models.CRDetails GetCRDetail(int crId)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.GetCRDetail(crId);
        }
        
        public static List<CR_Details.Models.CRAttachFiles> getCRAttachFiles(int? AttachFileId)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.getCRAttachFiles(AttachFileId);
        }
        
        public static List<string> GetExpectedDates()
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.GetExpectedDates();
        }
        public static CR_Details.Models.CRAttachFiles getCRAttachFile(int? FileId)
        {
            DAL.CRDetails DALCRDetails = new DAL.CRDetails();
            return DALCRDetails.getCRAttachFile(FileId);
        }
    }
}