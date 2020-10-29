using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Umbraco.Test.Controllers
{
    public class MyController : Umbraco.Web.Mvc.SurfaceController
    {
        public ActionResult Index()
        {
            return Content("Allo World");
        }
    }
}