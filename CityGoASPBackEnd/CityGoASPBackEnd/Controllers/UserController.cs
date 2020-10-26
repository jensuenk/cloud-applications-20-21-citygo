using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command;
using Application.Query;
using Application.ViewModel;
using CityGoASPBackEnd.Model;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CityGoASPBackEnd.Controllers
{
    [Route("Users")]
    [ApiController]
    public class UserController : Controller
    {
        IMediator _mediator;

        public UserController(IMediator mediator)
        {
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
            var query = new ShowUserByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]UserVM newUser) 
        {
            var command = new CreateUserCommand(newUser);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UserVM newUser, int id)
        {
            var command = new UpdateUserCommand(newUser, id);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        //[HttpGet]
        //public List<User> GetAllUsers()
        //{
        //    return context.Users.ToList();
        //}
        //[HttpPost]
        //public IActionResult CreateUser([FromBody] User newUser)
        //{
        //    context.Users.Add(newUser);
        //    context.SaveChanges();
        //    return Created("", newUser);
        //}
        //[Route("{id}/Items")]
        //[HttpGet]
        //public IActionResult GetUser(int id)
        //{
        //    var user = context.UserItems
        //        .Include(c => c.UserId)
        //        .Include(g => g._User)
        //        .Where(d => d.UserId == id);
        //    if (user != null)
        //    {
        //        return Ok(user);
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

        //[Route("{id}")]
        //[HttpGet]
        //public IActionResult GetOnlyUser(int id)
        //{
        //    var user = context.Users.Find(id);
        //    if (user != null)
        //    {
        //        return Ok(user);
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

        //[Route("{id}")]
        //[HttpDelete]
        //public IActionResult DeleteUser(int id)
        //{
        //    var user = context.Users.Find(id);
        //    if (user != null)
        //    {
        //        context.Users.Remove(user);
        //        context.SaveChanges();
        //        return NoContent();
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}

        //[HttpPut]
        //public IActionResult UpdateUser([FromBody] User updateUser)
        //{
        //    var orgUser = context.Users.Find(updateUser.UserId);
        //    if (orgUser != null)
        //    {
        //        orgUser.Name = updateUser.Name;
        //        orgUser.Username = updateUser.Username;
        //        orgUser.Email = updateUser.Email;
        //        orgUser.Balls = updateUser.Balls; 
        //        context.SaveChanges();
        //        return Ok(updateUser);
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }
        //}
    }
}
