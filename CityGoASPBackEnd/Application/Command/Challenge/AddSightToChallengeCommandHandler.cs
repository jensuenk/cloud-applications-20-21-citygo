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
    public class AddSightToChallengeCommandHandler : IRequestHandler<AddSightToChallengeCommand, int>
    {
        IDBContext _context;
        public AddSightToChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddSightToChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge challenge;
            Domain.Sight sight;

            try
            {
                challenge = await _context.Challenges.Where(u => u.ChallengeId == request.ChallengeId).SingleAsync();
            }
            catch (Exception)
            {
                ChallengeVM vm1 = new ChallengeVM(){ Error = "NotFound_Challenge" };
                return 4041;
            }

            try
            {
                sight = await _context.Sights.Where(i => i.SightId == request.SightId).SingleAsync();
            }
            catch (Exception)
            {
                ChallengeVM vm2 = new ChallengeVM() { Error = "NotFound_Sight" };
                return 4045;
            }


            challenge.Sight = sight;

            var query1 = _context.Challenges.Update(challenge);
            var query2 = _context.Sights.Update(sight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
