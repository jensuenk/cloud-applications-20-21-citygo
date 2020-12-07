using System;
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

        public ChallengeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllChallenges()
        {
            try
            {
                var query = new ShowAllChallengesQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception)
            {

                return BadRequest();
            }
           
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetChallengeById(int id)
        {
            var query = new ShowChallengeByIdQuery(id);
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
        public async Task<IActionResult> CreateChallenge([FromBody] ChallengeVM newChallenge)
        {
            var command = new CreateChallengeCommand(newChallenge);
            var result = await _mediator.Send(command);
            if (result.Error == "BadRequest_Challenge")
            {
                return BadRequest("The data in your body does not match with the data from the database");
            }
            else if (result.Error == "NotFound_Item")
            {
                return NotFound("Invalid id given for Item, try using an exsisting id");
            }
            else if(result.Error == "NotFound_User")
            {
                return NotFound("Invalid id given for User, try using an exsisting id");
            }
            {
                return Created("Command succesfull", result);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateChallenge([FromBody] ChallengeVM newChallenge)
        {
            var command = new UpdateChallengeCommand(newChallenge);
            var result = await _mediator.Send(command);
            if (result.Error == "BadRequest_Challenge")
            {
                return BadRequest("The data in your body does not match with the data from the database");
            }
            else if (result.Error == "NotFound_Item")
            {
                return NotFound("Invalid id given for Item, try using an exsisting id");
            }
            else if (result.Error == "NotFound_User")
            {
                return NotFound("Invalid id given for User, try using an exsisting id");
            }
            {
                return Created("Command succesfull", result);
            }
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteChallenge(int id)
        {
            var command = new DeleteChallengeCommand(id);
            var result = await _mediator.Send(command);
            if (result.Error == "NotFound")
            {
                return NotFound("Invalid id given, try using an exsisting id");
            }
            else
            {
                return Ok(result);
            }
        }
        [Route("{cid}/Items/{iid}")]
        [HttpPut]
        public async Task<IActionResult> AddItemToChallenge(int cid, int iid)
        {
            var command = new AddItemToChallengeCommand(cid, iid);
            var result = await _mediator.Send(command);
            if (result.Error == "NotFound_Challenge")
            {
                return NotFound("Invalid id given for Challenge, try using an exsisting id");
            }
            else if (result.Error == "NotFound_Item")
            {
                return NotFound("Invalid id given for Item, try using an exsisting id");
            }
            else
            {
                return Created("Command succesfull", result);
            }
        }
        [Route("{cid}/Sights/{sid}")]
        [HttpPut]
        public async Task<IActionResult> AddSightToChallenge(int cid, int sid)
        {
            var command = new AddSightToChallengeCommand(cid, sid);
            var result = await _mediator.Send(command);
            if (result.Error == "NotFound_Challenge")
            {
                return NotFound("Invalid id given for Challenge, try using an exsisting id");
            }
            else if (result.Error == "NotFound_Sight")
            {
                return NotFound("Invalid id given for Sight, try using an exsisting id");
            }
            else 
            {
                return Created("Command succesfull", result);
            }
        }
        [Route("{id}/Items")]
        [HttpGet]
        public async Task<IActionResult> GetItemsFromChallengeWithId(int id)
        {
            var query = new ShowChallengeWithItemByIdQuery(id);
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
        [Route("{id}/Sights")]
        [HttpGet]
        public async Task<IActionResult> GetSightsFromChallengeWithId(int id)
        {
            var query = new ShowChallengeWithSightByIdQuery(id);
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

       
    }
}
