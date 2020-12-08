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

namespace Application.Command.User
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, UserVM>
    {
        IDBContext _context;
        public DeleteUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<UserVM> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User user;
            try
            {
                user = await _context.Users.Where(c => c.UserId == request.UserId).SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return vm1;
            }

            var query = _context.Users.Remove(user);
            UserVM vm3 = new UserVM()
            {
                UserId = user.UserId,
                Name = user.Name,
                Balls = user.Balls,
                Challenges = user.Challenges,
                Email = user.Email,
                Username = user.Username,
                UsersItems = user.UsersItems,
                Error = "OK",
            };
            return vm3;
        }
    }

}