using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command.Sight;
using Application.Query.Sight;
using Application.ViewModel.Item;
using CityGoASPBackEnd.Model;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    [Route("Sights")]
    [ApiController]
    public class SightController : ControllerBase
    {
        IMediator _mediator;

        public SightController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSights()
        {
            var query = new ShowAllSightsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSightById(int id)
        {
            var query = new ShowSightByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSight([FromBody] SightVM newSight)
        {
            var command = new CreateSightCommand(newSight);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSight([FromBody] SightVM newSight)
        {
            var command = new UpdateSightCommand(newSight);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSight(int id)
        {
            var command = new DeleteSightCommand(id);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
