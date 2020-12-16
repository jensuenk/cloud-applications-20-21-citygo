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
                    .Include(i => i.Friends)
                    .ToListAsync();

            ListUserVM vm = new ListUserVM();
            foreach (var user in allUsers)
            {
                //List<Domain.Friends> Friends = new List<Domain.Friends>();
                //foreach (var item in user.Friends)
                //{
                //    var friend = await _context.Users.Where(u => u.UserId == item.FriendId).SingleAsync();
                //    Friends.Add(item);
                //}
                vm.Users.Add(new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Balls = user.Balls,
                    Email = user.Email,
                    Score = user.Score,
                    Friends = user.Friends
                });
            }
            return vm;
        }
    }
}
