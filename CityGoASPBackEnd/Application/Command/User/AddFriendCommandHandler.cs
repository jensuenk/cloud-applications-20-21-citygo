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
            Domain.User user = new Domain.User();
            Domain.User friend;
            try
            {
                user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return 4041;
            }
            try
            {
                friend = await _context.Users.Where(u => u.UserId == request.FriendId).SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Friend" };
                return 4042;
            }

            List<Domain.Friends> Friends = new List<Domain.Friends>();
            Domain.Friends Friend;
            if (user.Friends == null)
            {
               Friend = new Domain.Friends()
               {
                    User = user,
                    UserId = user.UserId,
                    FriendId = request.FriendId
               };

                Friends.Add(Friend);
                user.Friends = Friends;
            }
            else
            {
                Friend = new Domain.Friends()
                {
                    User = user,
                    UserId = user.UserId,
                    FriendId = request.FriendId
                };
                user.Friends.Add(Friend);
            }
  
            var query1 = _context.Users.Update(user);
            var query2 = _context.Friends.Add(Friend);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
