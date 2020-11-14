using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Command.Coordinate;
using Application.ViewModel.Coordinate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    [Route("Coordinates")]
    [ApiController]
    public class CoordinateController : ControllerBase
    {
        IMediator _mediator;

        public CoordinateController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCoordinate([FromBody] CoordinateVM newCoordinate)
        {
            var command = new CreateCoordinateCommand(newCoordinate);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCoordinate([FromBody] CoordinateVM newCoordinate)
        {
            var command = new UpdateCoordinateCommand(newCoordinate);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var command = new DeleteCoordinateCommand(id);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
