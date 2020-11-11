using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Sight
{
    public class UpdateSightCommandHandler : IRequestHandler<UpdateSightCommand, int>
    {
        IDBContext _context;
        public UpdateSightCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateSightCommand request, CancellationToken cancellationToken)
        {
            Domain.Sight newSight = new Domain.Sight() 
            { 
                SightId = request.Sight.SightId, 
                Info = request.Sight.Info, 
                Monument = request.Sight.Monument, 
                Name = request.Sight.Name, 
                Stop = request.Sight.Stop, 
                Latitude1 = request.Sight.Polygon[0,0], 
                Latitude2 = request.Sight.Polygon[1, 0], 
                Latitude3 = request.Sight.Polygon[2, 0], 
                Latitude4 = request.Sight.Polygon[3, 0], 
                Longitude1 = request.Sight.Polygon[0, 1], 
                Longitude2 = request.Sight.Polygon[1, 1], 
                Longitude3 = request.Sight.Polygon[2, 1] , 
                Longitude4 = request.Sight.Polygon[3, 1] 
            };
            var oldSight = await _context.Sights.Where(s => s.SightId == newSight.SightId).SingleAsync();
            oldSight.Name = newSight.Name;
            oldSight.Info = newSight.Info;
            oldSight.Monument = newSight.Monument;
            oldSight.Stop = newSight.Stop;
            oldSight.Latitude1 = newSight.Latitude1;
            oldSight.Latitude2 = newSight.Latitude2;
            oldSight.Latitude3 = newSight.Latitude3;
            oldSight.Latitude4 = newSight.Latitude4;

            oldSight.Longitude1 = newSight.Longitude1;
            oldSight.Longitude2 = newSight.Longitude2;
            oldSight.Longitude3 = newSight.Longitude3;
            oldSight.Longitude4 = newSight.Longitude4;

            var query = _context.Sights.Update(oldSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
