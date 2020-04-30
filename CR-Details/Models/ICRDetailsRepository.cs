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
        string UpdateCRDetails(CRDetails cRDetails, int CR_ID);
        int SaveCRAttachFiles(int CR_ID, HttpPostedFileBase attachFile);
        CRDetails GetRDetail(int crId);
        List<CRAttachFiles> getCRAttachFiles(int? AttachFileId);
        CRAttachFiles getCRAttachFile(int? FileId);

        List<string> GetExpectedDates();
    }
}
