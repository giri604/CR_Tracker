using CR_Details.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
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

        [HttpGet]
        public JsonResult GetExpectedDates()
        {
            var ExpectedDates = repository.GetExpectedDates();
            return Json(ExpectedDates, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CRDetails(FormCollection formCollection)
        {
            IFormatProvider culture = new CultureInfo("en-US", true);
            DateTime validValue;
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
            if (formCollection["UnitLead"] != "null")
            {
                var leadType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(formCollection["UnitLead"]));
                //cRDetails.UnitLead = leadType;
                cRDetails.UnitLead = leadType.ToString();
            }
            if (formCollection["Manager"] != "null")
            {
                var managerType = (Models.Lead)Enum.Parse(typeof(Models.Lead), Convert.ToString(formCollection["Manager"]));
                cRDetails.Manager = managerType.ToString();
            }
            cRDetails.ExpectedDate = DateTime.TryParse((formCollection["ExpectedDate"]), out validValue) ? validValue : (DateTime?)null;
            cRDetails.ReasonRCA = formCollection["ReasonRCA"];


            int CrID = repository.SaveCRDetails(cRDetails, null);

            int fileID = 0;

            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFileBase file = files[i];
                fileID = repository.SaveCRAttachFiles(CrID, file);

            }
            //return Json("Added Successfully", JsonRequestBehavior.AllowGet);
            return new EmptyResult();
        }
    }
}