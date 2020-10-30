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
    class DeleteChallengeCommandHandler : IRequestHandler<DeleteChallengeCommand, int>
    {
        IDBContext _context;
        public DeleteChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteChallengeCommand request, CancellationToken cancellationToken)
        {
            var challenge = await _context.Challenges.Where(c => c.ChallengeId == request.ChallengeId).SingleAsync();
            var query = _context.Challenges.Remove(challenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
