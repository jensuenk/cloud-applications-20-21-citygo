using Application.Interfaces;
using Domain;
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
    public class UpdateItemCommandHandler : IRequestHandler<UpdateItemCommand, int>
    {
        IDBContext _context;
        public UpdateItemCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(UpdateItemCommand request, CancellationToken cancellationToken)
        {
            Domain.Item newItem = new Domain.Item() 
            { 
                ItemId = request.Item.ItemId, 
                Name = request.Item.Name, 
                Location = request.Item.Location, 
                Picture = request.Item.Picture, 
                Rarity = request.Item.Rarity, 
                UsersItems = request.Item.UsersItems 
            };
            var oldItem = await _context.Items.Where(u => u.ItemId == newItem.ItemId).SingleAsync();
            oldItem.Name = newItem.Name;
            oldItem.Location = newItem.Location;
            oldItem.Picture = newItem.Picture;
            oldItem.Rarity = newItem.Rarity;
            oldItem.UsersItems = newItem.UsersItems;
            var query = _context.Items.Update(oldItem);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
