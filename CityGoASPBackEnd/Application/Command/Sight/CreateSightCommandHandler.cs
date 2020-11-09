using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Sight
{
    public class CreateSightCommandHandler : IRequestHandler<CreateSightCommand, int>
    {
        IDBContext _context;
        public CreateSightCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateSightCommand request, CancellationToken cancellationToken)
        {
            Domain.Sight newSight = new Domain.Sight() { SightId = request.Sight.SightId, Info = request.Sight.Info, Monument = request.Sight.Monument, Name = request.Sight.Name, Stop = request.Sight.Stop , Latitude1 = request.Sight.Polygon[0, 0], Latitude2 = request.Sight.Polygon[1, 0], Latitude3 = request.Sight.Polygon[2, 0], Latitude4 = request.Sight.Polygon[3, 0], Longitude1 = request.Sight.Polygon[0, 1], Longitude2 = request.Sight.Polygon[1, 1], Longitude3 = request.Sight.Polygon[2, 1], Longitude4 = request.Sight.Polygon[3, 1] };
           
            var query = _context.Sights.Add(newSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
