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
    public class DeleteFriendCommandHandler : IRequestHandler<DeleteFriendCommand, int>
    {
        IDBContext _context;
        public DeleteFriendCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteFriendCommand request, CancellationToken cancellationToken)
        {
            Domain.User user;
            Domain.User friend;
            try
            {
                user = await _context.Users.Where(u => u.UserId == request.UserId)
                    .Include(f=>f.Friends)
                    .SingleAsync();

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
            Friends = user.Friends;
            foreach (var item in Friends)
            {
                if (item.FriendId == friend.UserId)
                {
                    Friends.Remove(item);
                }
            }
            user.Friends = Friends;
            var query1 = _context.Users.Update(user);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
