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
    public class ShowUserWithAllFriendsQueryHandler : IRequestHandler<ShowUserWithAllFriendsQuery, UserVM>
    {
        IDBContext _context;
        public ShowUserWithAllFriendsQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<UserVM> Handle(ShowUserWithAllFriendsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _context.Users.Where(u => u.UserId == request.UserId)
               .Include(i => i.Friends)
               .SingleAsync();
                List<Domain.User> tussen = new List<Domain.User>();
                foreach (var item in user.Friends)
                {
                    var friend = await _context.Users.Where(u => u.UserId == item.FriendId).SingleAsync();
                    tussen.Add(friend);
                }
                UserVM vm = new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Email = user.Email,
                    Balls = user.Balls,
                    UserFriends = tussen
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
