using Application.Interfaces;
using Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query
{
    public class ShowAllUsersQueryHandler : IRequestHandler<ShowAllUsersQuery, ListUserVM>
    {
        IDBContext _context;
        public ShowAllUsersQueryHandler(IDBContext context) 
        {
            _context = context;
        }
        public async Task<ListUserVM> Handle(ShowAllUsersQuery request, CancellationToken cancellationToken)
        {
            var allUsers = await _context.Users
                .Include(i => i.UsersItems)
                .Include(c => c.UsersChallenges)
                .Include(l => l.Location)
                .ToListAsync();


            ListUserVM vm = new ListUserVM();
            foreach (var user in allUsers)
            {
                vm.Users.Add(new UserVM() 
                { 
                    UserId = user.UserId, 
                    Name = user.Name, 
                    Username = user.Username,
                    Balls = user.Balls, 
                    Email = user.Email,
                    Score = user.Score,
                    UsersChallenges = user.UsersChallenges,
                    UsersItems = user.UsersItems,
                    PicrtureURL = user.PicrtureURL,
                    Online = user.Online,
                    Location = user.Location
                });
            }
            return vm;
        }
    }
}
