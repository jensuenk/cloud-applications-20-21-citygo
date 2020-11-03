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
    public class ShowUserWithItemByIdQueryHandler : IRequestHandler<ShowUserWithItemByIdQuery, UserVM>
    {
        IDBContext _context;
        public ShowUserWithItemByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<UserVM> Handle(ShowUserWithItemByIdQuery request, CancellationToken cancellationToken)
        {
            //var user = await _context.Users
                //.Include(i => i.Items)
                //.Where(u => u.UserId == request.UserId).ToList();
            var user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();
            UserVM vm = new UserVM() { UserId = user.UserId, Name = user.Name, Username = user.Username, Email = user.Email, Balls = user.Balls, Items = user.Items };
            return vm;
        }

       
    }
}
