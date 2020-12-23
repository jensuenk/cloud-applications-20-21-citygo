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
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, int>
    {
        IDBContext _context;
        public DeleteUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User user;
            try
            {
                user = await _context.Users.Where(c => c.UserId == request.UserId).SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound" };
                return 4043;
            }

            var query = _context.Users.Remove(user);
            return await _context.SaveAsync(cancellationToken);
        }
    }

}