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
                fileID = repository.SaveCRAttachFiles(cRDetails.SrNo, file);

            }
            cRDetails.fileID = fileID;
            string message = repository.SaveCRDetails(cRDetails, null);
            return View();
        }
    }
}