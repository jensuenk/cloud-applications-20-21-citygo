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
    public class AddChallengeToUserCommandHandler : IRequestHandler<AddChallengeToUserCommand, int>
    {
        IDBContext _context;
        public AddChallengeToUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddChallengeToUserCommand request, CancellationToken cancellationToken)
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
                return 4041;
            }

            try
            {
                challenge = await _context.Challenges.Where(u => u.ChallengeId == request.ChallengeId).SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Challenge" };
                return 4042;
            }

            int localScore = 0;
            if (user.Challenges != null)
            {
                foreach (var chal in user.Challenges)
                {
                    localScore += chal.Score;
                }
            }
            user.Score += challenge.Score;
            user.Score += localScore;

            challenge.User = user;

            var query1 = _context.Challenges.Update(challenge);
            var query2 = _context.Users.Update(user);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
