using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CR_Details.Models
{
    public interface ICRDetailsRepository
    {
        int SaveCRDetails(CRDetails cRDetails, HttpPostedFileBase attachFile);
        //UpdateCRDetails(cRDetails)
        string UpdateCRDetails(CRDetails cRDetails, int SrNo);
        int SaveCRAttachFiles(int SrNo, HttpPostedFileBase attachFile);
        CRDetails GetRDetail(int crId);
        List<CRAttachFiles> getCRAttachFiles(int? AttachFileId);
        CRAttachFiles getCRAttachFile(int? FileId);

        List<string> GetExpectedDates();
    }
}
