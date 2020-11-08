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
    public class DeleteSightCommandHandler : IRequestHandler<DeleteSightCommand, int>
    {
        IDBContext _context;
        public DeleteSightCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteSightCommand request, CancellationToken cancellationToken)
        {
            var sight = await _context.Sights.Where(c => c.SightId == request.SightId).SingleAsync();
            var query = _context.Sights.Remove(sight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
