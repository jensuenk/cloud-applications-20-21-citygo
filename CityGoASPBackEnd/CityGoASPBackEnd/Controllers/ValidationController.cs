using Application.Interfaces;
using Application.ViewModel;
using Application.ViewModel.Challenge;
using Application.ViewModel.Item;
using Application.ViewModel.Sight;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    public class ValidationController : Microsoft.AspNetCore.Mvc.ControllerBase, IUserValidation, IItemValidation, ISightValidation, IChallengeValidation
    {
        public async Task<IActionResult> HandleValidation(int errorCode)
        {
            var result = errorCode;
            if (result == 4001)
            {
                return BadRequest("The data in your body does not match with the data from the database");
            }
            else if (result == 4002)
            {
                return BadRequest("There was no friend request");
            }
            else if (result == 4041)
            {
                return NotFound("Invalid id given for Challenge, try using an exsisting id");
            }
            else if (result == 4042)
            {
                return NotFound("Invalid id given for Item, try using an exsisting id");
            }
            else if (result == 4043)
            {
                return NotFound("Invalid id given for User, try using an exsisting id");
            }
            else if (result == 4044)
            {
                return NotFound("Invalid id given for Friend, try using an exsisting id");
            }
            else if (result == 4045)
            {
                return NotFound("Invalid id given for Sight, try using an exsisting id");
            }
            else
            {
                return Ok("Command succesfull");
            }
        }

        public async Task<IActionResult> HandleValidation(UserVM user)
        {
            if (user.Error == "NotFound")
            {
                user.Error = "Invalid id given, try using an exsisting id";
                return NotFound(user.Error);
            }
            else if (user.Error == "NotFound_Mail")
            {
                user.Error = "Invalid email given, try using an exsisting email";
                return NotFound(user.Error);
            }
            else
            {
                user.Error = "OK";
                return Ok(user);
            }
        }

        public async Task<IActionResult> HandleValidation(ItemVM item)
        {
            if (item.Error == "NotFound")
            {
                item.Error = "Invalid id given, try using an exsisting id";
                return NotFound(item.Error);
            }
            else
            {
                item.Error = "OK";
                return Ok(item);
            }
        }

        public async Task<IActionResult> HandleValidation(SightVM sight)
        {
            if (sight.Error == "NotFound")
            {
                sight.Error = "Invalid id given, try using an exsisting id";
                return NotFound(sight.Error);
            }
            else
            {
                sight.Error = "OK";
                return Ok(sight);
            }
        }

        public async Task<IActionResult> HandleValidation(ChallengeVM challenge)
        {
            if (challenge.Error == "NotFound")
            {
                challenge.Error = "Invalid id given, try using an exsisting id";
                return NotFound(challenge.Error);
            }
            else
            {
                challenge.Error = "OK";
                return Ok(challenge);
            }
        }
    }
}
