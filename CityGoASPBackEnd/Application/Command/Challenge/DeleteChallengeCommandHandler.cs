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
    public class DeleteChallengeCommandHandler : IRequestHandler<DeleteChallengeCommand, int>
    {
        IDBContext _context;
        public DeleteChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(DeleteChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge challenge;
            try
            {
                challenge = await _context.Challenges.Where(c => c.ChallengeId == request.ChallengeId).SingleAsync();
            }
            catch (Exception)
            {
                ChallengeVM vm1 = new ChallengeVM() { Error = "NotFound" };
                return 4041;
            }
           
            var query = _context.Challenges.Remove(challenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
