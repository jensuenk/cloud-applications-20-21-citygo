using Application.Interfaces;
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
    public class UpdateChallengeCommandHandler : IRequestHandler<UpdateChallengeCommand, int>
    {
        IDBContext _context;
        public UpdateChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge newChallenge = new Domain.Challenge() { ChallengeId = request.Challenge.ChallengeId, Name = request.Challenge.Name, Task = request.Challenge.Task };
            var oldChallenge = await _context.Challenges.Where(c => c.ChallengeId == newChallenge.ChallengeId).SingleAsync();
            oldChallenge.Name = newChallenge.Name;
            oldChallenge.Task = newChallenge.Task;
            var query = _context.Challenges.Update(oldChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
