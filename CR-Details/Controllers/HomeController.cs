using CR_Details.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CR_Details.Controllers
{
    public class HomeController : Controller
    {
        static readonly ICRDetailsRepository repository = new CRDetailsRepository();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        //[HttpPost]
        //public ActionResult CRDetails(CRDetails cRDetails)
        //{
        //    int CrID = repository.SaveCRDetails(cRDetails, null);

        //    int fileID = 0;
        //    string uname = Request["uploadername"];
        //    HttpFileCollectionBase files = Request.Files;
        //    for (int i = 0; i < files.Count; i++)
        //    {
        //        HttpPostedFileBase file = files[i];
        //        //insert file into CRAttachFiles table and get id return for CRDetails
        //        fileID = repository.SaveCRAttachFiles(CrID, file);

        //    }
        //    cRDetails.AttachFileId = fileID;
        //    return View();
        //}
        [HttpPost]
        public ActionResult CRDetails(FormCollection formCollection)
        {
            string uname = Request["uploadername"];
            HttpFileCollectionBase files = Request.Files;
            CR_Details.Models.CRDetails cRDetails = new CRDetails();
            cRDetails.CrTitle = formCollection["CrTitle"];
            cRDetails.CrDescription = formCollection["CrDescription"];
            if (formCollection["ComplexityList"] != "null")
            {
                var complexType = (Models.Complexity)Enum.Parse(typeof(Models.Complexity), Convert.ToString(formCollection["ComplexityList"]));
                cRDetails.ComplexityList = complexType;
            }
            if (formCollection["DepartmentList"] != "null")
            {
                var departmentType = (Models.Department)Enum.Parse(typeof(Models.Department), Convert.ToString(formCollection["DepartmentList"]));
                cRDetails.DepartmentList = departmentType;
            }
            if (formCollection["CategoryList"] != "null")
            {
                var categoryType = (Models.Category)Enum.Parse(typeof(Models.Category), Convert.ToString(formCollection["CategoryList"]));
                cRDetails.CategoryList = categoryType;
            }
            cRDetails.ProjectCompletedSchedule = Convert.ToBoolean(formCollection["ProjectCompletedSchedule"]);
            cRDetails.KeyProjects = Convert.ToBoolean(formCollection["KeyProjects"]);
            cRDetails.ProjectCRReceivedDate = (formCollection["ProjectCRReceivedDate"] != "") ? (Convert.ToDateTime(formCollection["ProjectCRReceivedDate"]).Date) : DateTime.MinValue;
            cRDetails.ProjectCRReceivedDate = (formCollection["ProjectCRReceivedDate"] != "") ? (Convert.ToDateTime(formCollection["ProjectCRReceivedDate"]).Date) : DateTime.MinValue;
            cRDetails.FinalProjectCRReceivedDate = (formCollection["FinalProjectCRReceivedDate"] != "") ? (Convert.ToDateTime(formCollection["FinalProjectCRReceivedDate"]).Date) : DateTime.MinValue;
            cRDetails.NoOfCRReceivedDuringUAT = (formCollection["NoOfCRReceivedDuringUAT"] != "") ? (Convert.ToInt32(formCollection["NoOfCRReceivedDuringUAT"])) : 0;
            cRDetails.UATDeliveryDate = (formCollection["UATDeliveryDate"] != "") ? (Convert.ToDateTime(formCollection["UATDeliveryDate"]).Date) : DateTime.MinValue;
            cRDetails.UATSignoffDate = (formCollection["UATSignoffDate"] != "") ? (Convert.ToDateTime(formCollection["UATSignoffDate"]).Date) : DateTime.MinValue;
            cRDetails.ProjectCRLiveDate = (formCollection["ProjectCRLiveDate"] != "") ? (Convert.ToDateTime(formCollection["ProjectCRLiveDate"]).Date) : DateTime.MinValue;
            cRDetails.FirstCommittedLiveDate = (formCollection["FirstCommittedLiveDate"] != "") ? (Convert.ToDateTime(formCollection["FirstCommittedLiveDate"]).Date) : DateTime.MinValue;
            cRDetails.TAT = formCollection["TAT"];
            cRDetails.NoOfShowstoppersPostGoLive = (formCollection["NoOfShowstoppersPostGoLive"] != "") ? (Convert.ToInt32(formCollection["NoOfShowstoppersPostGoLive"])) : 0;
            if (formCollection["UnitLead"] != "null")
            {
                var leadType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(formCollection["UnitLead"]));
                cRDetails.UnitLead = leadType;
            }
            if (formCollection["Manager"] != "null")
            {
                var managerType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(formCollection["Manager"]));
                cRDetails.Manager = managerType;
            }
            cRDetails.ReasonRCA = formCollection["ReasonRCA"];


            int CrID = repository.SaveCRDetails(cRDetails, null);

            int fileID = 0;

            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFileBase file = files[i];
                //insert file into CRAttachFiles table and get id return for CRDetails
                fileID = repository.SaveCRAttachFiles(CrID, file);

            }
            return View();
        }
    }
}