using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.User
{
    public class AddItemToUserCommandHandler : IRequestHandler<AddItemToUserCommand, int>
    {
        IDBContext _context;
        public AddItemToUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddItemToUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();
            var item = await _context.Items.Where(i => i.ItemId == request.ItemId).SingleAsync();
            if (user.Items == null)
            {
                List<Domain.Item> tussen = new List<Domain.Item>();
                tussen.Add(item);
                user.Items = tussen;
            }
            else {
                user.Items.Add(item);
            }
            item.User = user;

            var query1 = _context.Users.Update(user);
            var query2 = _context.Items.Update(item);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
