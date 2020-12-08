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
    public class AddChallengeToUserCommandHandler : IRequestHandler<AddChallengeToUserCommand, UserVM>
    {
        IDBContext _context;
        public AddChallengeToUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<UserVM> Handle(AddChallengeToUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User user;
            Domain.Challenge challenge;
            try
            {
                user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return vm1;
            }

            try
            {
                challenge = await _context.Challenges.Where(u => u.ChallengeId == request.ChallengeId).SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Challenge" };
                return vm1;
            }

            challenge.User = user;

            var query1 = _context.Challenges.Update(challenge);
            var query2 = _context.Users.Update(user);
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
