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
                ItemId = request.ItemVM.ItemId, 
                Name = request.ItemVM.Name, 
                Location = request.ItemVM.Location, 
                Picture = request.ItemVM.Picture, 
                Rarity = request.ItemVM.Rarity, 
                UsersItems = request.ItemVM.UsersItems 
            };
            if (request.ItemVM.UserId != 0)
            {
                var user = await _context.Users.Where(c => c.UserId == request.ItemVM.UserId).SingleAsync();
                UsersItems usersItems = new UsersItems()
                {
                    User = user,
                    UserId = user.UserId,
                    Item = newItem,
                    ItemId = newItem.ItemId
                };
                if (request.ItemVM.UsersItems == null)
                {
                    List<Domain.UsersItems> tussen = new List<Domain.UsersItems>();
                    tussen.Add(usersItems);
                    newItem.UsersItems = tussen;
                }
                else
                {
                    newItem.UsersItems.Add(usersItems);
                }
                if (user.UsersItems == null)
                {
                    List<Domain.UsersItems> tussen = new List<Domain.UsersItems>();
                    tussen.Add(usersItems);
                    user.UsersItems = tussen;
                }
                else
                {
                    user.UsersItems.Add(usersItems);
                }
            }

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
