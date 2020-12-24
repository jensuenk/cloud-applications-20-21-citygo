using Application.Interfaces;
using Application.ViewModel.Item;
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
            Domain.Sight sight;
            try
            {
                sight = await _context.Sights.Where(c => c.SightId == request.SightId).SingleAsync();
            }
            catch (Exception)
            {
                SightVM vm1 = new SightVM() { Error = "NotFound_Sight" };
                return 4045;
            }
            var query = _context.Sights.Remove(sight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
