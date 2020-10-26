using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CityGoASPBackEnd.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    [Route("sight")]
    [ApiController]
    public class SightController : ControllerBase
    {
       // private readonly Context context;

        public SightController()
        {
            
        }

        //[HttpGet]
        //public List<Sight> GetAllSights()
        //{
        //    return context.Sights.ToList();
        //}
        //[HttpPost]
        //public IActionResult CreateSight([FromBody] Sight newSight)
        //{
        //    context.Sights.Add(newSight);
        //    context.SaveChanges();
        //    return Created("", newSight);
        //}
  

        //[Route("{id}")]
        //[HttpGet]
        //public IActionResult GetOnlySight(int id)
        //{
        //    var sight = context.Sights.Find(id);
        //    if (sight != null)
        //    {
        //        return Ok(sight);
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

        //[Route("{id}")]
        //[HttpDelete]
        //public IActionResult DeleteSight(int id)
        //{
        //    var sight = context.Sights.Find(id);
        //    if (sight != null)
        //    {
        //        context.Sights.Remove(sight);
        //        context.SaveChanges();
        //        return NoContent();
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

        //[HttpPut]
        //public IActionResult UpdateSight([FromBody] Sight updateSight)
        //{
        //    var orgSight = context.Sights.Find(updateSight.SightId);
        //    if (orgSight != null)
        //    {
        //        orgSight.Name = updateSight.Name;
        //        orgSight.Info = updateSight.Info;
        //        orgSight.Monument = updateSight.Monument;
        //        orgSight.Stop = updateSight.Stop;
        //        orgSight.Location = updateSight.Location;
        //        context.SaveChanges();
        //        return Ok(updateSight);
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}
    }
}
