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
                return 4043;
            }

            try
            {
                friend = await _context.Users.Where(u => u.UserId == request.FriendId).SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Friend" };
                return 4044;
            }


            Domain.Friends fr = new Domain.Friends()
            {
                //Friend = user,
                UserId = user.UserId,
                FriendId = friend.UserId
            };


            List<Domain.Friends> Friends = new List<Domain.Friends>();
            Friends = user.Friends;
            var itemToRemove = Friends.FirstOrDefault(r => r.FriendId == friend.UserId);
            Friends.Remove(itemToRemove);
            user.Friends = Friends;

            List<Domain.Friends> Friends2 = new List<Domain.Friends>();
            Friends = user.Friends;
            var itemToRemove2 = Friends.FirstOrDefault(r => r.FriendId == user.UserId);
            Friends2.Remove(itemToRemove);
            friend.Friends = Friends;

            var query1 = _context.Users.Update(user);
            var query2 = _context.Users.Update(friend);
            //var query1 = _context.Friends.Remove(fr);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
