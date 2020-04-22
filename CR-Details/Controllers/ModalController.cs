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
            return PartialView(cRDetail);
            //return cRDetail;
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