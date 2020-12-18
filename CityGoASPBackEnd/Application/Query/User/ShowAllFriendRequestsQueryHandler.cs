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

namespace Application.Query.User
{
    public class ShowAllFriendRequestsQueryHandler : IRequestHandler<ShowAllFriendRequestsQuery, UserVM>
    {
        IDBContext _context;
        public ShowAllFriendRequestsQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<UserVM> Handle(ShowAllFriendRequestsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _context.Users.Where(u => u.UserId == request.UserId)
                    .Include(i => i.Friends)
                    .SingleAsync();
                List<Domain.User> userFriends = new List<Domain.User>();
                List<Domain.Friends> Friends = new List<Domain.Friends>();
                foreach (var item in user.Friends)
                {
                    var friend = await _context.Users.Where(u => u.UserId == item.FriendId)
                        .SingleAsync();
                    if (item.AcceptedUser1 == false )
                    {
                        userFriends.Add(friend);
                        Friends.Add(item);
                    }
                  
                }
                UserVM vm = new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Friends = Friends,
                    UserFriends = userFriends
                };
                return vm;
            }
            catch (Exception)
            {
                UserVM vm = new UserVM()
                {
                    Error = "NotFound"
                };
                return vm;
            }
        }
    }
}
