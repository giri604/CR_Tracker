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
        string SaveCRDetails(CRDetails cRDetails, HttpPostedFileBase attachFile);
        int SaveCRAttachFiles(int SrNo, HttpPostedFileBase attachFile);
        CRDetails GetRDetail(int crId);
    }
}
