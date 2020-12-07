using Application.Interfaces;
using Application.ViewModel.Challenge;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Challenge
{
    public class DeleteChallengeCommandHandler : IRequestHandler<DeleteChallengeCommand, ChallengeVM>
    {
        IDBContext _context;
        public DeleteChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ChallengeVM> Handle(DeleteChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge challenge;
            try
            {
                challenge = await _context.Challenges.Where(c => c.ChallengeId == request.ChallengeId).SingleAsync();
            }
            catch (Exception)
            {
                ChallengeVM vm1 = new ChallengeVM() { Error = "NotFound" };
                return vm1;
            }
           
            var query = _context.Challenges.Remove(challenge);
            ChallengeVM vm3 = new ChallengeVM()
            {
                ChallengeId = challenge.ChallengeId,
                QuestionChallenge = challenge.QuestionChallenge,
                Answer = challenge.Answer,
                Items = challenge.Items,
                Name = challenge.Name,
                Sight = challenge.Sight,
                Task = challenge.Task,
                User = challenge.User,
                Error = "OK"
            };
            return vm3;
        }
    }
}
