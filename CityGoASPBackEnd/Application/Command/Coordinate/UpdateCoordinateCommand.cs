using Application.ViewModel.Coordinate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Coordinate
{
    public class UpdateCoordinateCommand : IRequest<int>, IRequest<CoordinateVM>
    {
        public CoordinateVM Coordinate { get; set; }
        public UpdateCoordinateCommand(CoordinateVM updateCoordinate)
        {
            Coordinate = updateCoordinate;
        }
    }
}
