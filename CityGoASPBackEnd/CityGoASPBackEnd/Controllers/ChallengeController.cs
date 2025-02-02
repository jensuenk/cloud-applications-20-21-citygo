﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command.Challenge;
using Application.Query.Challenge;
using Application.ViewModel.Challenge;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    [Route("Challenges")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        IMediator _mediator;
        ValidationController ValidationController;


        public ChallengeController(IMediator mediator)
        {
            _mediator = mediator;
            ValidationController = new ValidationController();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllChallenges()
        {
            var query = new ShowAllChallengesQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetChallengeById(int id)
        {
            var query = new ShowChallengeByIdQuery(id);
            var result = await _mediator.Send(query);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [HttpPost]
        public async Task<IActionResult> CreateChallenge([FromBody] ChallengeVM newChallenge)
        {
            var command = new CreateChallengeCommand(newChallenge);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateChallenge([FromBody] ChallengeVM newChallenge)
        {
            var command = new UpdateChallengeCommand(newChallenge);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteChallenge(int id)
        {
            var command = new DeleteChallengeCommand(id);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{cid}/Items/{iid}")]
        [HttpPut]
        public async Task<IActionResult> AddItemToChallenge(int cid, int iid)
        {
            var command = new AddItemToChallengeCommand(cid, iid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{cid}/Sights/{sid}")]
        [HttpPut]
        public async Task<IActionResult> AddSightToChallenge(int cid, int sid)
        {
            var command = new AddSightToChallengeCommand(cid, sid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{id}/Items")]
        [HttpGet]
        public async Task<IActionResult> GetItemsFromChallengeWithId(int id)
        {
            var query = new ShowChallengeWithItemByIdQuery(id);
            var result = await _mediator.Send(query);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{id}/Sights")]
        [HttpGet]
        public async Task<IActionResult> GetSightsFromChallengeWithId(int id)
        {
            var query = new ShowChallengeWithSightByIdQuery(id);
            var result = await _mediator.Send(query);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
    }
}
