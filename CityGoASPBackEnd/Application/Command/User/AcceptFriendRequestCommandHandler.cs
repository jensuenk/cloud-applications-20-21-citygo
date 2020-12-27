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
                // Search for the user
                User = await _context.Users.Where(u => u.UserId == request.UserId)
                    .Include(u => u.Friends)
                    .SingleAsync();
            }
            catch (Exception)
            {
                // If it fails, send an error to the the controller that says the user hasn't been found
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return 4043;
            }
            try
            {
                // Search for the friend of the user
                Friend = await _context.Users.Where(u => u.UserId == request.FriendId)
                    .Include(u => u.Friends)
                    .SingleAsync();
            }
            catch (Exception)
            {
                // If it fails, send an error to the the controller that says the friend hasn't been found
                UserVM vm1 = new UserVM() { Error = "NotFound_Friend" };
                return 4044;
            }

            try
            {
                List<Domain.Friends> fr1 = new List<Domain.Friends>();
                foreach (var friend in User.Friends)
                {
                    // Search for the friend status where userid and friendid are together from the user
                    if (friend.UserId == User.UserId && friend.FriendId == Friend.UserId)
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
                    // Search for the friend status where userid and friendid are together from the friend
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
            }
            catch (Exception)
            {
                // If it fails, send an error to the the controller that says there isn't any friend request
                UserVM vm3 = new UserVM() { Error = "BadRequest_FriendRequest" };
                return 4002;
            }
            
            var query1 = _context.Users.Update(User);
            var query2 = _context.Users.Update(Friend);

            return await _context.SaveAsync(cancellationToken);
        }
    }
}
