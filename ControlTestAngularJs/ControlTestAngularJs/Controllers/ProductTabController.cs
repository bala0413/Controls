using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ControlTestAngularJs.Controllers
{
    public class ProductTabController : Controller
    {
        // GET: ProductTab
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddNewProduct()
        {
            return PartialView("AddProduct");
        }

        public ActionResult ShowProducts()
        {
            return PartialView("ShowAllProduct");
        }

        public ActionResult EditProduct()
        {
            return PartialView("EditProduct");
        }

        public ActionResult DeleteProduct()
        {
            return PartialView("DeleteProduct");
        }
    }
}