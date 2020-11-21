using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Coordinate
{
    public class CreateCoordinateCommandHandler : IRequestHandler<CreateCoordinateCommand, int>
    {
        IDBContext _context;
        public CreateCoordinateCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateCoordinateCommand request, CancellationToken cancellationToken)
        {
           
            Domain.Coordinate newCoordinate = new Domain.Coordinate()
            {
                Latitude = request.CoordinateVM.Latitude,
                Longitude = request.CoordinateVM.Longitude
            };
            if (request.CoordinateVM.SightId != 0)
            {
                var sight = await _context.Sights.Where(s => s.SightId == request.CoordinateVM.SightId).SingleAsync();
                newCoordinate.Sight = sight;
            }
           
            var query = _context.Coordinates.Add(newCoordinate);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
