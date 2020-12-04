using Application.Interfaces;
using Application.ViewModel;
using Application.ViewModel.UsersItems;
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
    public class ShowUserWithItemByIdQueryHandler : IRequestHandler<ShowUserWithItemByIdQuery, UserVM>
    {
        IDBContext _context;
        public ShowUserWithItemByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<UserVM> Handle(ShowUserWithItemByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var usersItems = await _context.UsersItems
                    .Include(i => i.Item)
                    .Where(u => u.UserId == request.UserId)
                    .ToListAsync();

                var user = await _context.Users
                    .Include(i => i.UsersItems)
                    .Where(u => u.UserId == request.UserId)
                    .SingleAsync();

                UserVM vm = new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Email = user.Email,
                    Balls = user.Balls,
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
