using Application.Interfaces;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Item
{
    public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, int>
    {
        IDBContext _context;
        public CreateItemCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateItemCommand request, CancellationToken cancellationToken)
        {
            Domain.Item newItem = new Domain.Item() 
            { 
                ItemId = request.Item.ItemId,
                Name = request.Item.Name, 
                Location = request.Item.Location, 
                Picture = request.Item.Picture, 
                Rarity = request.Item.Rarity , 
                UsersItems = request.Item.UsersItems 
            };
            var query = _context.Items.Add(newItem);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
