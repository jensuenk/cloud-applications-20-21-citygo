﻿using Application.Interfaces;
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
    public class ShowAllUsersWithAllItemsQueryHandler : IRequestHandler<ShowAllUsersWithAllItemsQuery, ListUserVM>
    {
        IDBContext _context;
        public ShowAllUsersWithAllItemsQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ListUserVM> Handle(ShowAllUsersWithAllItemsQuery request, CancellationToken cancellationToken)
        {
            var allUsers = await _context.Users
                .Include(i => i.UsersItems)
                .Include(c => c.UsersChallenges)
                .ToListAsync();

            ListUserVM vm = new ListUserVM();
            foreach (var user in allUsers)
            {
                var usersItems = await _context.UsersItems
                    .Include(i => i.Item)
                    .Where(u => u.UserId == user.UserId)
                    .ToListAsync();
                var usersChallenges = await _context.UsersChallenges
                  .Include(i => i.Challenge)
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
                    UsersChallenges = usersChallenges,
                    UsersItems = usersItems,
                    PicrtureURL = user.PicrtureURL,
                    Online = user.Online,
                    Location = user.Location
                });
            }
            return vm;
        }
    }
}
