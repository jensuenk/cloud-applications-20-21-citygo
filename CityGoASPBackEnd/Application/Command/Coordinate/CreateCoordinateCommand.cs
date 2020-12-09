using Application.ViewModel.Coordinate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Coordinate
{
    public class CreateCoordinateCommand : IRequest<int>
    {
        public CoordinateVM CoordinateVM { get; set; }
        public CreateCoordinateCommand(CoordinateVM newCoordinate)
        {
            CoordinateVM = newCoordinate;
        }
    }
}
