using Application.Interfaces;
using Application.ViewModel;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, int>
    {
        IDBContext _context;
        public UpdateUserCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            User newUser = new User() { UserId = request.User.UserId, Name = request.User.Name, Username = request.User.Username, Email = request.User.Email, Balls = request.User.Balls };
            var olduser = await _context.Users.Where(u => u.UserId == newUser.UserId).SingleAsync();
            olduser.Name = newUser.Name;
            olduser.Username = newUser.Username;
            olduser.Email = newUser.Email;
            olduser.Balls = newUser.Balls;
            var query = _context.Users.Update(olduser);
            return await _context.SaveAsync(cancellationToken);
        }     
    }
}
