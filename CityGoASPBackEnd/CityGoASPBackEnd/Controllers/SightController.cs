using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command.Sight;
using Application.Query.Sight;
using Application.ViewModel.Item;
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
            if (result.Error == "NotFound")
            {
                return NotFound("Invalid id given, try using an exsisting id");
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateSight([FromBody] SightVM newSight)
        {
            var command = new CreateSightCommand(newSight);
            var result = await _mediator.Send(command);
            if (result == 4001)
            {
                return BadRequest("The data in your body does not match with the data from the database");

            }
            else if(result == 4041) {
                return NotFound("Invalid id given for Challenge, try using an exsisting id");
            }
            else {
                return Created("Command succesfull", result);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSight([FromBody] SightVM newSight)
        {
            var command = new UpdateSightCommand(newSight);
            var result = await _mediator.Send(command);
            if (result == 4001)
            {
                return BadRequest("The data in your body does not match with the data from the database");

            }
            else if (result == 4041)
            {
                return NotFound("Invalid id given for Challenge, try using an exsisting id");
            }
            else if (result == 4042)
            {
                return NotFound("Invalid id given for the new Sight, try using an exsisting id");
            }
            else
            {
                return Created("Command succesfull", result);
            }
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSight(int id)
        {
            var command = new DeleteSightCommand(id);
            var result = await _mediator.Send(command);
            if (result == 4041)
            {
                return NotFound("Invalid id given for Sight, try using an exsisting id");
            }
            else
            {
                return Ok(result);
            }
        }
        [Route("{id}/Challenges")]
        [HttpGet]
        public async Task<IActionResult> GetChallengesFromSightWithId(int id)
        {
            var query = new ShowSightWithChallengeByIdQuery(id);
            var result = await _mediator.Send(query);
            if (result.Error == "NotFound")
            {
                return NotFound("Invalid id given, try using an exsisting id");
            }
            else
            {
                return Ok(result);
            }
        }
        [Route("All")]
        [HttpGet]
        public async Task<IActionResult> GetAllSightsWithRelations()
        {
            var query = new ShowSightsWithAllRelationsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
