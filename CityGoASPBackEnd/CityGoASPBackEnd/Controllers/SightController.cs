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
        ValidationController ValidationController;


        public SightController(IMediator mediator)
        {
            _mediator = mediator;
            ValidationController = new ValidationController();
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
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSight([FromBody] SightVM newSight)
        {
            var command = new CreateSightCommand(newSight);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSight([FromBody] SightVM newSight)
        {
            var command = new UpdateSightCommand(newSight);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSight(int id)
        {
            var command = new DeleteSightCommand(id);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{id}/Challenges")]
        [HttpGet]
        public async Task<IActionResult> GetChallengesFromSightWithId(int id)
        {
            var query = new ShowSightWithChallengeByIdQuery(id);
            var result = await _mediator.Send(query);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
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
