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

namespace Application.Query
{
    public class ShowUserByIdQueryHandler : IRequestHandler<ShowUserByIdQuery, UserVM>
    {
        IDBContext _context;
        public ShowUserByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<UserVM> Handle(ShowUserByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _context.Users.Where(u => u.UserId == request.UserId)
               .Include(i => i.UsersItems)
               .Include(c => c.UsersChallenges)
               .Include(i => i.Friends)
               .SingleAsync();

                List<Domain.User> tussen = new List<Domain.User>();
                foreach (var item in user.Friends)
                {
                    var friend = await _context.Users.Where(u => u.UserId == item.FriendId).SingleAsync();
                    tussen.Add(friend);
                }
                var usersItems = await _context.UsersItems
                   .Include(i => i.Item)
                   .Where(u => u.UserId == request.UserId)
                   .ToListAsync();


                var usersChallenges = await _context.UsersChallenges
                   .Include(i => i.Challenge)
                   .Where(u => u.UserId == user.UserId)
                   .ToListAsync();
                UserVM vm = new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Email = user.Email,
                    Balls = user.Balls,
                    Score = user.Score,
                    UserFriends = tussen,
                    UsersChallenges = usersChallenges,
                    UsersItems = usersItems
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
