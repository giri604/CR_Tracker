using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CR_Details.Controllers
{
    public class CR_TrackerController : Controller
    {
        // GET: CR_Tracker
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CR_Tracker_Dashboard()
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                ViewBag.Error_Message = ex.Message.ToString();
                return View();
            }
        }
    }
}