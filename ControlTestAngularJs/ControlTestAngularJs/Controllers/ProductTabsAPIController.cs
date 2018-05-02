using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ControlTestAngularJs.Models;

namespace ControlTestAngularJs.Controllers
{
    public class ProductTabsAPIController : ApiController
    {
        private ProductEntities db = new ProductEntities();

        // GET: api/ProductTabsAPI
        public IQueryable<ProductTab> GetProductTabs()
        {
            return db.ProductTabs;
        }

        // GET: api/ProductTabsAPI/5
        [ResponseType(typeof(ProductTab))]
        public IHttpActionResult GetProductTab(int id)
        {
            ProductTab productTab = db.ProductTabs.Find(id);
            if (productTab == null)
            {
                return NotFound();
            }

            return Ok(productTab);
        }

        // PUT: api/ProductTabsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductTab(int id, ProductTab productTab)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productTab.Id)
            {
                return BadRequest();
            }

            db.Entry(productTab).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTabExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ProductTabsAPI
        [ResponseType(typeof(ProductTab))]
        public IHttpActionResult PostProductTab(ProductTab productTab)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductTabs.Add(productTab);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productTab.Id }, productTab);
        }

        // DELETE: api/ProductTabsAPI/5
        [ResponseType(typeof(ProductTab))]
        public IHttpActionResult DeleteProductTab(int id)
        {
            ProductTab productTab = db.ProductTabs.Find(id);
            if (productTab == null)
            {
                return NotFound();
            }

            db.ProductTabs.Remove(productTab);
            db.SaveChanges();

            return Ok(productTab);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductTabExists(int id)
        {
            return db.ProductTabs.Count(e => e.Id == id) > 0;
        }
    }
}