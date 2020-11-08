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
            Domain.Sight newSight = new Domain.Sight() { SightId = request.Sight.SightId, Info = request.Sight.Info, Monument = request.Sight.Monument, Name = request.Sight.Name, Stop = request.Sight.Stop, Polygon1 = request.Sight.Polygon1, Polygon2 = request.Sight.Polygon2, Polygon3 = request.Sight.Polygon3, Polygon4 = request.Sight.Polygon4 };
            var oldSight = await _context.Sights.Where(s => s.SightId == newSight.SightId).SingleAsync();
            oldSight.Name = newSight.Name;
            oldSight.Info = newSight.Info;
            oldSight.Monument = newSight.Monument;
            oldSight.Stop = newSight.Stop;
            oldSight.Polygon1 = newSight.Polygon1;
            oldSight.Polygon2 = newSight.Polygon2;
            oldSight.Polygon3 = newSight.Polygon3;
            oldSight.Polygon4 = newSight.Polygon4;
            var query = _context.Sights.Update(oldSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
