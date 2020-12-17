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
    public class AcceptFriendRequestCommandHandler : IRequestHandler<AcceptFriendRequestCommand, int>
    {
        IDBContext _context;
        public AcceptFriendRequestCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AcceptFriendRequestCommand request, CancellationToken cancellationToken)
        {
            Domain.User User = new Domain.User();
            Domain.User Friend;
            try
            {
                User = await _context.Users.Where(u => u.UserId == request.UserId)
                    .Include(u => u.Friends)
                    .SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return 4041;
            }
            try
            {
                Friend = await _context.Users.Where(u => u.UserId == request.FriendId)
                    .Include(u => u.Friends)
                    .SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Friend" };
                return 4042;
            }

            List<Domain.Friends> fr1 = new List<Domain.Friends>();
            foreach (var friend in User.Friends)
            {
                if (friend.UserId == User.UserId && friend.FriendId == Friend.UserId )
                {
                    friend.AcceptedUser1 = true;
                    friend.AcceptedUser2 = true;
                    var query = _context.Friends.Update(friend);
                    fr1.Add(friend);
                }
                else
                {
                    fr1.Add(friend);
                }
            }
            List<Domain.Friends> fr2 = new List<Domain.Friends>();
            foreach (var friend in Friend.Friends)
            {
                if (friend.UserId == Friend.UserId && friend.FriendId == User.UserId)
                {
                    friend.AcceptedUser1 = true;
                    friend.AcceptedUser2 = true;
                    var query = _context.Friends.Update(friend);
                    fr2.Add(friend);
                }
                else
                {
                    fr2.Add(friend);
                }
            }

            User.Friends = fr1;
            Friend.Friends = fr2;
            var query1 = _context.Users.Update(User);
            var query2 = _context.Users.Update(Friend);

            return await _context.SaveAsync(cancellationToken);
        }
    }
}
