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
    public class ColorTabsAPIController : ApiController
    {
        private ProductColorEntities db = new ProductColorEntities();

        // GET: api/ColorTabsAPI
        public IQueryable<ColorTab> GetColorTabs()
        {
            return db.ColorTabs;
        }

        // GET: api/ColorTabsAPI/5
        [ResponseType(typeof(ColorTab))]
        public IHttpActionResult GetColorTab(int id)
        {
            ColorTab colorTab = db.ColorTabs.Find(id);
            if (colorTab == null)
            {
                return NotFound();
            }

            return Ok(colorTab);
        }

        // PUT: api/ColorTabsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutColorTab(int id, ColorTab colorTab)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != colorTab.Id)
            {
                return BadRequest();
            }

            db.Entry(colorTab).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorTabExists(id))
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

        // POST: api/ColorTabsAPI
        [ResponseType(typeof(ColorTab))]
        public IHttpActionResult PostColorTab(ColorTab colorTab)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ColorTabs.Add(colorTab);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = colorTab.Id }, colorTab);
        }

        // DELETE: api/ColorTabsAPI/5
        [ResponseType(typeof(ColorTab))]
        public IHttpActionResult DeleteColorTab(int id)
        {
            ColorTab colorTab = db.ColorTabs.Find(id);
            if (colorTab == null)
            {
                return NotFound();
            }

            db.ColorTabs.Remove(colorTab);
            db.SaveChanges();

            return Ok(colorTab);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ColorTabExists(int id)
        {
            return db.ColorTabs.Count(e => e.Id == id) > 0;
        }
    }
}