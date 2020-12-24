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
                user = await _context.Users.Where(u => u.UserId == request.UserId)
                    .Include(uc =>uc.UsersChallenges)
                    .SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return 4043;
            }

            try
            {
                challenge = await _context.Challenges.Where(u => u.ChallengeId == request.ChallengeId)
                     .Include(uc => uc.UsersChallenges)
                     .SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Challenge" };
                return 4041;
            }

            UsersChallenges usersChallenges = new UsersChallenges()
            {
                Challenge = challenge,
                ChallengeId = challenge.ChallengeId,
                User = user,
                UserId = user.UserId
            };
            if (user.UsersChallenges == null)
            {
                List<Domain.UsersChallenges> tussen = new List<Domain.UsersChallenges>();
                tussen.Add(usersChallenges);
                user.UsersChallenges = tussen;
            }
            else
            {
                user.UsersChallenges.Add(usersChallenges);
            }

            if (challenge.UsersChallenges == null)
            {
                List<Domain.UsersChallenges> tussen = new List<Domain.UsersChallenges>();
                tussen.Add(usersChallenges);
                challenge.UsersChallenges = tussen;
            }
            else
            {
                challenge.UsersChallenges.Add(usersChallenges);
            }
            int localScore = 0;
            if (user.UsersChallenges != null)
            {
                foreach (var chal in user.UsersChallenges)
                {
                    var foundChallenge = _context.Challenges.Find(chal.ChallengeId);
                    localScore += foundChallenge.Score;
                }
            }
            user.Score += localScore;

            var query1 = _context.Challenges.Update(challenge);
            var query2 = _context.Users.Update(user);
            var query3 = _context.UsersChallenges.Add(usersChallenges);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
