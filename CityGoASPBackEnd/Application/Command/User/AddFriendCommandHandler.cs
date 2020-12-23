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
                user = await _context.Users.Where(u => u.UserId == request.UserId)
                    .Include(u=>u.Friends)
                    .SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return 4043;
            }
            try
            {
                friend = await _context.Users.Where(u => u.UserId == request.FriendId)
                    .Include(u => u.Friends)
                    .SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Friend" };
                return 4044;
            }

            List<Domain.Friends> Friends = new List<Domain.Friends>();
            Domain.Friends Friend;
            if (user.Friends == null)
            {
                Friend = new Domain.Friends()
                {
                    //Friend = friend,
                    UserId = request.UserId,
                    User = user,
                    AcceptedUser1 = true,
                    FriendId = request.FriendId,
                    AcceptedUser2 = false
               };

                Friends.Add(Friend);
                user.Friends = Friends;
            }
            else
            {
                Friend = new Domain.Friends()
                {
                    //Friend = friend,
                    UserId = request.UserId,
                    User = user,
                    AcceptedUser1 = true,
                    FriendId = request.FriendId,
                    AcceptedUser2 = false
                };
                user.Friends.Add(Friend);
            }

            List<Domain.Friends> Friends2 = new List<Domain.Friends>();
            Domain.Friends Friend2;
            if (friend.Friends == null)
            {
                Friend2 = new Domain.Friends()
                {
                    UserId = request.FriendId,
                    AcceptedUser1 = false,
                    User = friend,
                    //Friend = user,
                    FriendId = request.UserId,
                    AcceptedUser2 = true
                };

                Friends2.Add(Friend2);
                friend.Friends = Friends2;
            }
            else
            {
                Friend2 = new Domain.Friends()
                {
                    UserId = request.FriendId,
                    AcceptedUser1 = false,
                    User = friend,
                    //Friend = user,
                    FriendId = request.UserId,
                    AcceptedUser2 = true
                };
                friend.Friends.Add(Friend2);
            }

            var query1 = _context.Users.Update(user);
            var query2 = _context.Friends.Add(Friend);
            var query3 = _context.Users.Update(friend);
            var query4 = _context.Friends.Add(Friend2);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
