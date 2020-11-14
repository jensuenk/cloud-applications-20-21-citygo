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
    public class UpdateCoordinateCommandHandler : IRequestHandler<UpdateCoordinateCommand, int>
    {
        IDBContext _context;
        public UpdateCoordinateCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateCoordinateCommand request, CancellationToken cancellationToken)
        {
            Domain.Coordinate newCoordinate = new Domain.Coordinate()
            {
              Latitude = request.Coordinate.Latitude,
              Longitude = request.Coordinate.Longitude
            };
            if (request.Coordinate.SightId != null)
            {
                var sight = await _context.Sights.Where(s => s.SightId == request.Coordinate.SightId).SingleAsync();
                newCoordinate.Sight = sight;
            }
            var oldCoordinate = await _context.Coordinates.Where(c => c.CoordinateId == newCoordinate.CoordinateId).SingleAsync();
            oldCoordinate.Latitude = newCoordinate.Latitude;
            oldCoordinate.Longitude = newCoordinate.Longitude;
            oldCoordinate.Sight = newCoordinate.Sight;
            var query = _context.Coordinates.Update(oldCoordinate);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
