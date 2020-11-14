using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Coordinate
{
    public class DeleteCoordinateCommand :  IRequest<int>
    {
        public int CoordinateId { get; set; }
        public DeleteCoordinateCommand(int id)
        {
            this.CoordinateId = id;
        }
    }
}
