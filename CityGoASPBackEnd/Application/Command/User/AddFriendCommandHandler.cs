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


            Domain.UsersFriends usersFriends = new Domain.UsersFriends()
            {
                User = user,
                UserId = user.UserId,
                Friend = friend,
                FriendId = friend.UserId
            };
            if (user.UsersItems == null)
            {
                List<Domain.UsersFriends> tussen = new List<Domain.UsersFriends>();
                tussen.Add(usersFriends);
                user.UsersFriends = tussen;
            }
            else
            { 
                user.UsersFriends.Add(usersFriends);
            }
            if (friend.UsersFriends == null)
            {
                List<Domain.UsersFriends> tussen = new List<Domain.UsersFriends>();
                tussen.Add(usersFriends);
                friend.UsersFriends = tussen;
            }
            else
            {
                friend.UsersFriends.Add(usersFriends);
            }
            var query1 = _context.Users.Update(user);
            var query2 = _context.Users.Update(friend);
            var query3 = _context.UsersFriends.Add(usersFriends);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
