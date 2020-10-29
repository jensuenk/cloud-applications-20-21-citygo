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
            Domain.Sight newSight = new Domain.Sight() { SightId = request.Sight.SightId, Info = request.Sight.Info, Location = request.Sight.Location, Monument = request.Sight.Monument, Name = request.Sight.Name, Stop = request.Sight.Stop };
            var query = _context.Sights.Add(newSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
