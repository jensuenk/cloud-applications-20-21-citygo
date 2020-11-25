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
                    .Include(i => i.UsersFriends)
                    .ToListAsync();



            ListUserVM vm = new ListUserVM();
            foreach (var user in allUsers)
            {
                var usersItems = await _context.UsersItems
                    .Include(f => f.User)
                    .Where(u => u.UserId == user.UserId)
                    .ToListAsync();
                vm.Users.Add(new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Balls = user.Balls,
                    Email = user.Email,
                    Friends = user.UsersFriends

                });
            }
            return vm;
        }
    }
}
