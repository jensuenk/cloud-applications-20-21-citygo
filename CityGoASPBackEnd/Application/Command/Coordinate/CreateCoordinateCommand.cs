using Application.ViewModel.Coordinate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Coordinate
{
    public class CreateCoordinateCommand : IRequest<int>
    {
        public CoordinateVM Coordinate { get; set; }
        public CreateCoordinateCommand(CoordinateVM newCoordinate)
        {
            Coordinate = newCoordinate;
        }
    }
}
