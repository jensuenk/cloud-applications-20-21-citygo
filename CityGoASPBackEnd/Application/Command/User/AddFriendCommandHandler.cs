using Application.Interfaces;
using Application.ViewModel;
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
    public class AddFriendCommandHandler : IRequestHandler<AddFriendCommand, int>
    {
        IDBContext _context;
        public AddFriendCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddFriendCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();
            var friend = await _context.Users.Where(u => u.UserId == request.FriendId).SingleAsync();

            List<Domain.Friends> Friends = new List<Domain.Friends>();

            Domain.Friends Friend = new Domain.Friends()
            {
                User = user,
                UserId = user.UserId,
                FriendId = request.FriendId
            };

            Friends.Add(Friend);
            user.Friends = Friends;
            var query1 = _context.Users.Update(user);
            var query2 = _context.Friends.Add(Friend);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
