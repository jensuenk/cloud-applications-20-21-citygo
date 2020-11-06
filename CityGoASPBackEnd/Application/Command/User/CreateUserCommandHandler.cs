using Application.Interfaces;
using Application.ViewModel;
using Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
        IDBContext _context;
        public CreateUserCommandHandler(IDBContext context) 
        {
            _context = context;
        }
        public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User newUser = new Domain.User() { UserId = request.User.UserId, Name = request.User.Name, Username = request.User.Username, Email = request.User.Email, Balls = request.User.Balls, Items = request.User.Items};
            var query = _context.Users.Add(newUser);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
