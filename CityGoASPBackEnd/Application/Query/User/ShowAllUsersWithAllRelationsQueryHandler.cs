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
    public class ShowAllUsersWithAllRelationsQueryHandler : IRequestHandler<ShowAllUsersWithAllRelationsQuery, ListUserVM>
    {
        IDBContext _context;
        public ShowAllUsersWithAllRelationsQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ListUserVM> Handle(ShowAllUsersWithAllRelationsQuery request, CancellationToken cancellationToken)
        {
           

            var allUsers = await _context.Users
                .Include(i => i.UsersItems)
                .Include(c=> c.Challenges)
                .ToListAsync();

           

            ListUserVM vm = new ListUserVM();
            foreach (var user in allUsers)
            {
                var usersItems = await _context.UsersItems
                    .Include(i => i.Item)
                    .Where(u => u.UserId == user.UserId)
                    .ToListAsync();
                vm.Users.Add(new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Balls = user.Balls,
                    Email = user.Email,
                    Score = user.Score,
                    UsersItems = usersItems,
                    Challenges = user.Challenges
                });
            }
            return vm;
        }
    }
}
