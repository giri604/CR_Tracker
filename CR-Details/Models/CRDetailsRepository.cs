﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace CR_Details.Models
{
    public class CRDetailsRepository : ICRDetailsRepository
    {

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

        public List<string> GetExpectedDates()
        {
            List<string> ExpectedDates = new List<string>();
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            ExpectedDates = BAL.CRDetails.GetExpectedDates();
            return ExpectedDates;
        }

        public CRDetails GetRDetail(int crId)
        {
            CRDetails cRDetails = new CRDetails();
            BAL.CRDetails BalCRDetail = new BAL.CRDetails();
            cRDetails = BAL.CRDetails.GetCRDetail(crId);
            return cRDetails;
        }

        public int SaveCRAttachFiles(int CR_ID, HttpPostedFileBase attachFile)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            int message = BAL.CRDetails.AddCRAttachFiles(CR_ID, attachFile);
            return message;
        }

        public int SaveCRDetails(CRDetails cRDetails, HttpPostedFileBase attachFile)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            int message = BAL.CRDetails.AddCRDetail(cRDetails, attachFile);
            return message;
        }

        public string UpdateCRDetails(CRDetails cRDetails, int CR_ID)
        {
            BAL.CRDetails BALCRDetails = new BAL.CRDetails();
            string message = BAL.CRDetails.UpdateCRDetails(cRDetails, CR_ID);
            return message;
        }
    }
}