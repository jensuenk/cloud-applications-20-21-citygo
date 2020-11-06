using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Item
{
    public class DeleteItemCommandHandler : IRequestHandler<DeleteItemCommand, int>
    {
        IDBContext _context;
        public DeleteItemCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
        {
            var item = await _context.Items.Where(c => c.ItemId == request.ItemId).SingleAsync();
            var query = _context.Items.Remove(item);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
