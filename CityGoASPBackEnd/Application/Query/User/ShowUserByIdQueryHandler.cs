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
            var user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();
            UserVM vm = new UserVM() 
            { 
                UserId = user.UserId, 
                Name = user.Name, 
                Username = user.Username, 
                Email = user.Email, 
                Balls = user.Balls
            };
            return vm;
        }
    }
}
