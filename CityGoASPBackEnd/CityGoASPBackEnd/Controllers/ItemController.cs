using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command.Item;
using Application.Query.Item;
using Application.ViewModel;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    [Route("Items")]
    [ApiController]
    public class ItemController : ControllerBase
    {

        IMediator _mediator;

        public ItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var query = new ShowAllItemsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetItemById(int id)
        {
            var query = new ShowItemByIdQuery(id);
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
        public async Task<IActionResult> CreateItem([FromBody] ItemVM newItem)
        {
            var command = new CreateItemCommand(newItem);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateItem([FromBody] ItemVM newItem)
        {
            var command = new UpdateItemCommand(newItem);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var command = new DeleteItemCommand(id);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
