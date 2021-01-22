using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command;
using Application.Command.User;
using Application.Query;
using Application.Query.User;
using Application.ViewModel;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CityGoASPBackEnd.Controllers
{
    [Route("Users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IMediator _mediator;
        ValidationController ValidationController;

        // Constructor
        public UserController(IMediator mediator)
        {
            ValidationController = new ValidationController();
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers() 
        {
            var query = new ShowAllUsersQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetUserById(int id)
        {
            //Search the user by id via the query
            var query = new ShowUserByIdQuery(id);
            //await the result from the handler
            var result = await _mediator.Send(query);
            // send the result for validation
            var valResult = ValidationController.HandleValidation(result);
            // return the result of the valdiation to the user
            return await valResult;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]UserVM newUser) 
        {
            var command = new CreateUserCommand(newUser);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
            
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserVM newUser)
        {
            var command = new UpdateUserCommand(newUser);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{uid}/Items/{iid}")]
        [HttpPut]
        public async Task<IActionResult> AddItemToUser(int uid, int iid)
        {
            var command = new AddItemToUserCommand(uid, iid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{uid}/Challenges/{cid}")]
        [HttpPut]
        public async Task<IActionResult> AddChallengeToUser(int uid, int cid)
        {
            var command = new AddChallengeToUserCommand(uid, cid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{id}/Items")]
        [HttpGet]
        public async Task<IActionResult> GetItemsFromUserWithId(int id)
        {
            var query = new ShowUserWithItemByIdQuery(id);
            var result = await _mediator.Send(query);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var command = new DeleteUserCommand(id);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
        [Route("All")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsersWithItems()
        {
            var query = new ShowAllUsersWithAllRelationsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [Route("{uid}/Friends/{fid}")]
        [HttpPut]
        public async Task<IActionResult> AddFriendToUser(int uid, int fid)
        {
            var command = new AddFriendCommand(uid, fid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{uid}/FriendRequests/{fid}")]
        [HttpPut]
        public async Task<IActionResult> AcceptFriendRequest(int uid, int fid)
        {
            var command = new AcceptFriendRequestCommand(uid, fid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{uid}/Friends/{fid}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteFriendFromUser(int uid, int fid)
        {
            var command = new DeleteFriendCommand(uid, fid);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("Friends")]
        [HttpGet]
        public async Task<IActionResult> ShowFriendsFromAllUsers()
        {
            var command = new ShowAllFriendsQuery();
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [Route("{id}/Friends")]
        [HttpGet]
        public async Task<IActionResult> ShowFriendsFromUser(int id)
        {
            var command = new ShowUserWithAllFriendsQuery(id);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{id}/FriendRequests")]
        [HttpGet]
        public async Task<IActionResult> ShowFriendRequestsFromUser(int id)
        {
            var command = new ShowAllFriendRequestsQuery(id);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("{email}/Email")]
        [HttpGet]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var query = new ShowUserByEmailQuery(email);
            var result = await _mediator.Send(query);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }

        [Route("ProfilePicture")]
        [HttpPut]
        public async Task<IActionResult> ChangeProfilePicture([FromBody] UserVM newUser)
        {
            var command = new ChangeProfileURLfromUserCommand(newUser);
            var result = await _mediator.Send(command);
            var valResult = ValidationController.HandleValidation(result);
            return await valResult;
        }
    }
}
