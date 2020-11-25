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
                ItemId = request.ItemVM.ItemId,
                Name = request.ItemVM.Name, 
                Location = request.ItemVM.Location, 
                Picture = request.ItemVM.Picture, 
                Rarity = request.ItemVM.Rarity
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
            var query = _context.Items.Add(newItem);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
