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
            Domain.Sight newSight = new Domain.Sight() { SightId = request.Sight.SightId, Info = request.Sight.Info, Location = request.Sight.Location, Monument = request.Sight.Monument, Name = request.Sight.Name, Stop = request.Sight.Stop };
            var oldSight = await _context.Sights.Where(s => s.SightId == newSight.SightId).SingleAsync();
            oldSight.Name = newSight.Name;
            oldSight.Info = newSight.Info;
            oldSight.Location = newSight.Location;
            oldSight.Monument = newSight.Monument;
            oldSight.Stop = newSight.Stop;
            var query = _context.Sights.Update(oldSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
