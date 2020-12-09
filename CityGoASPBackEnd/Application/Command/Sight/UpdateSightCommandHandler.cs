using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Sight
{
    public class UpdateSightCommandHandler : IRequestHandler<UpdateSightCommand, int>
    {
        IDBContext _context;
        public UpdateSightCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateSightCommand request, CancellationToken cancellationToken)
        {
            Domain.Sight newSight = new Domain.Sight() 
            { 
                SightId = request.SightVM.SightId, 
                Info = request.SightVM.Info, 
                Monument = request.SightVM.Monument, 
                Name = request.SightVM.Name, 
                Stop = request.SightVM.Stop,
                Coordinates = request.SightVM.Coordinates
            };

            // Link existing challenges to a sight trough the body
            List<Domain.Challenge> newChallenges = new List<Domain.Challenge>();
            foreach (var challenge in request.SightVM.Challenges)
            {
                // Check if challenge exists, if so, add it to a list to asign later
                var foundChallenge = _context.Challenges.Find(challenge.ChallengeId);
                if (foundChallenge != null)
                {
                    newChallenges.Add(foundChallenge);
                }
            }

            var oldSight = await _context.Sights.Where(s => s.SightId == newSight.SightId)
                .Include(c => c.Challenges)
                .Include(c => c.Coordinates)
                .SingleAsync();
            oldSight.Name = newSight.Name;
            oldSight.Info = newSight.Info;
            oldSight.Monument = newSight.Monument;
            oldSight.Stop = newSight.Stop;
            oldSight.Challenges = newChallenges;
            oldSight.Coordinates = newSight.Coordinates;


            var query = _context.Sights.Update(oldSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
