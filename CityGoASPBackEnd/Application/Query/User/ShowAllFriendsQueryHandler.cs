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
    public class ShowAllFriendsQueryHandler : IRequestHandler<ShowAllFriendsQuery, ListUserVM>
    {
        IDBContext _context;
        public ShowAllFriendsQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ListUserVM> Handle(ShowAllFriendsQuery request, CancellationToken cancellationToken)
        {
            var allUsers = await _context.Users
                .ToListAsync();
            ListUserVM vm = new ListUserVM();
            List<int> tussen = new List<int>();
           
            foreach (var user in allUsers)
            {
                List<Domain.User> friends = new List<Domain.User>();
                foreach (var friendId in user.Friends)
                {
                    var friend = await _context.Users.Where(u => u.UserId == friendId).SingleAsync();
                    friends.Add(friend);
                }
                vm.Users.Add(new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Balls = user.Balls,
                    Email = user.Email,
                    Friends = friends
                });
                
            }
            return vm;
        }
    }
}
