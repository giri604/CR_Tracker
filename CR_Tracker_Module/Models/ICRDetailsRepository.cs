using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CR_Tracker_Module.Models
{
    public interface ICRDetailsRepository
    {
        string SaveCRDetails(CRDetails cRDetails, HttpPostedFileBase attachFile);
        int SaveCRAttachFiles(int SrNo, HttpPostedFileBase attachFile);
        CRDetails GetRDetail(int crId);
    }
}