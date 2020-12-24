using Application.Interfaces;
using Application.ViewModel.Item;
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
            Domain.Sight newSight;
            try
            {
                if (request.SightVM.Info != null && request.SightVM.Monument != null && request.SightVM.Name != null && request.SightVM.Stop != null)
                {
                    newSight = new Domain.Sight()
                    {
                        SightId = request.SightVM.SightId,
                        Info = request.SightVM.Info,
                        Monument = request.SightVM.Monument,
                        Name = request.SightVM.Name,
                        Stop = request.SightVM.Stop,
                        Coordinates = request.SightVM.Coordinates,
                    };
                }
                else
                {
                    return 4001;
                }
            }
            catch (Exception)
            {
                SightVM vm1 = new SightVM() { Error = "BadRequest_Sight" };
                return 4001;
            }


            // Link existing challenges to a sight trough the body
            List<Domain.Challenge> newChallenges = new List<Domain.Challenge>(); ;
            try
            {
                if (request.SightVM.Challenges != null)
                {
                    foreach (var challenge in request.SightVM.Challenges)
                    {
                        // Check if challenge exists, if so, add it to a list to asign later
                        var foundChallenge = _context.Challenges.Find(challenge.ChallengeId);
                        if (foundChallenge != null)
                        {
                            newChallenges.Add(foundChallenge);
                        }
                    }
                }
            }
            catch (Exception)
            {
                SightVM vm1 = new SightVM() { Error = "NotFound_Challenge" };
                return 4041;
            }
            // Assign the list to the sight's challenges
            newSight.Challenges = newChallenges;

            Domain.Sight oldSight;
            try
            {
                oldSight = await _context.Sights.Where(s => s.SightId == newSight.SightId)
                    .Include(c => c.Challenges)
                    .Include(c => c.Coordinates)
                    .SingleAsync();
            }
            catch (Exception)
            {
                SightVM vm1 = new SightVM() { Error = "NotFound_Sight" };
                return 4045;
            }
            
            oldSight.Name = newSight.Name;
            oldSight.Info = newSight.Info;
            oldSight.Monument = newSight.Monument;
            oldSight.Stop = newSight.Stop;
            oldSight.Challenges = newSight.Challenges;
            oldSight.Coordinates = newSight.Coordinates;


            var query = _context.Sights.Update(oldSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
