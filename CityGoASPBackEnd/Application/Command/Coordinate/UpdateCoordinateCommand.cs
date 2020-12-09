using Application.ViewModel.Coordinate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Coordinate
{
    public class UpdateCoordinateCommand : IRequest<int>, IRequest<CoordinateVM>
    {
        public CoordinateVM CoordinateVM { get; set; }
        public UpdateCoordinateCommand(CoordinateVM updateCoordinate)
        {
            CoordinateVM = updateCoordinate;
        }
    }
}
