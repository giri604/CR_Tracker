using CR_Details.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CR_Details.Controllers
{
    public class ModalController : Controller
    {
        static readonly ICRDetailsRepository repository = new CRDetailsRepository();
        // GET: Modal
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetCRDetails(int crID)
        {
            Models.CRDetails cRDetail = repository.GetRDetail(crID);
            if (cRDetail == null)
            {
                return null;
            }
            else
            {
                List<CRAttachFiles> files = repository.getCRAttachFiles(cRDetail.AttachFileId);
                cRDetail.CRAttachFiles = files;
            }
            return PartialView(cRDetail);
        }

        [HttpPost]
        public ActionResult CRDetails(CRDetails cRDetails)
        {
            int fileID = 0;
            string uname = Request["uploadername"];
            HttpFileCollectionBase files = Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFileBase file = files[i];
                //insert file into CRAttachFiles table and get id return for CRDetails
                fileID = repository.SaveCRAttachFiles(cRDetails.CR_ID, file);

            }
            cRDetails.AttachFileId = fileID;
            int CrID = repository.SaveCRDetails(cRDetails, null);
            return View();
        }

        [HttpPost]
        public FileResult DownloadFile(int? fileId)
        {
            CRAttachFiles cRAttachFile = repository.getCRAttachFile(fileId);
            byte[] bytes = null;
            string fileName = string.Empty;
            string contentType = string.Empty;
            if (cRAttachFile != null)
            {
                bytes = cRAttachFile.AttachDocument;
                fileName = cRAttachFile.FileName;
                contentType = cRAttachFile.ContentType;
            }

            return File(bytes, contentType, fileName);
        }

        //UpdateCRDetails
        [HttpPost]
        public ActionResult UpdateCRDetails(FormCollection formCollection)
        {
            DateTime validValue;
            int CR_ID = 0;
            CR_Details.Models.CRDetails cRDetails = new CRDetails();
            CR_ID = (formCollection["CR_ID"] != "") ? (Convert.ToInt32(formCollection["CR_ID"])) : 0;
            cRDetails.CrTitle = formCollection["CrTitle"];
            cRDetails.CrDescription = formCollection["CrDescription"];
            if (formCollection["ComplexityList"] != "")
            {
                var complexType = (Models.Complexity)Enum.Parse(typeof(Models.Complexity), Convert.ToString(formCollection["ComplexityList"]));
                cRDetails.ComplexityList = complexType;
            }
            if (formCollection["DepartmentList"] != "")
            {
                var departmentType = (Models.Department)Enum.Parse(typeof(Models.Department), Convert.ToString(formCollection["DepartmentList"]));
                cRDetails.DepartmentList = departmentType;
            }
            if (formCollection["CategoryList"] != "")
            {
                var categoryType = (Models.Category)Enum.Parse(typeof(Models.Category), Convert.ToString(formCollection["CategoryList"]));
                cRDetails.CategoryList = categoryType;
            }
            cRDetails.ProjectCompletedSchedule = (formCollection["ProjectCompletedSchedule"] != "null") ? (Convert.ToBoolean(formCollection["ProjectCompletedSchedule"])) : (Boolean?)null;
            cRDetails.KeyProjects = (formCollection["KeyProjects"] != "null") ? (Convert.ToBoolean(formCollection["KeyProjects"])) : (Boolean?)null;
            cRDetails.ProjectCRReceivedDate = DateTime.TryParse((formCollection["ProjectCRReceivedDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.FinalProjectCRReceivedDate = DateTime.TryParse((formCollection["FinalProjectCRReceivedDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.NoOfCRReceivedDuringUAT = (formCollection["NoOfCRReceivedDuringUAT"] != "") ? (Convert.ToInt32(formCollection["NoOfCRReceivedDuringUAT"])) : 0;
            cRDetails.UATDeliveryDate = DateTime.TryParse((formCollection["UATDeliveryDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.UATSignoffDate = DateTime.TryParse((formCollection["UATSignoffDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.ProjectCRLiveDate = DateTime.TryParse((formCollection["ProjectCRLiveDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.FirstCommittedLiveDate = DateTime.TryParse((formCollection["FirstCommittedLiveDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.TAT = formCollection["TAT"];
            cRDetails.NoOfShowstoppersPostGoLive = (formCollection["NoOfShowstoppersPostGoLive"] != "") ? (Convert.ToInt32(formCollection["NoOfShowstoppersPostGoLive"])) : 0;
            if (formCollection["UnitLead"] != "")
            {
                var leadType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(formCollection["UnitLead"]));
                cRDetails.UnitLead = leadType;
            }
            if (formCollection["Manager"] != "")
            {
                var managerType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(formCollection["Manager"]));
                cRDetails.Manager = managerType;
            }
            if (formCollection["CRStatus"] != "")
            {
                var statusType = (Models.CRStatus)Enum.Parse(typeof(Models.CRStatus), Convert.ToString(formCollection["CRStatus"]));
                cRDetails.CRStatus = statusType;
            }
            cRDetails.ReasonRCA = formCollection["ReasonRCA"];

            string message = repository.UpdateCRDetails(cRDetails, CR_ID);
            return Content(message);

        }
    }
}