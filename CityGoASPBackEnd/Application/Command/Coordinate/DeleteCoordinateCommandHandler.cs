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
    public class DeleteCoordinateCommandHandler : IRequestHandler<DeleteCoordinateCommand, int>
    {
        IDBContext _context;
        public DeleteCoordinateCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteCoordinateCommand request, CancellationToken cancellationToken)
        {
            var coordinate = await _context.Coordinates.Where(c => c.CoordinateId == request.CoordinateId).SingleAsync();
            var query = _context.Coordinates.Remove(coordinate);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
