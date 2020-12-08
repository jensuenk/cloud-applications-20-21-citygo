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
    public class UpdateSightCommandHandler : IRequestHandler<UpdateSightCommand, SightVM>
    {
        IDBContext _context;
        public UpdateSightCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<SightVM> Handle(UpdateSightCommand request, CancellationToken cancellationToken)
        {
            Domain.Sight newSight;
            try
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
            catch (Exception)
            {
                SightVM vm1 = new SightVM() { Error = "BadRequest_Sight" };
                return vm1;
            }


            // Link existing challenges to a sight trough the body
            List<Domain.Challenge> newChallenges;
            try
            {
                newChallenges = new List<Domain.Challenge>();
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
            catch (Exception)
            {
                SightVM vm1 = new SightVM() { Error = "NotFound_Challenge" };
                return vm1;
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
                return vm1;
            }
            
            oldSight.Name = newSight.Name;
            oldSight.Info = newSight.Info;
            oldSight.Monument = newSight.Monument;
            oldSight.Stop = newSight.Stop;
            oldSight.Challenges = newSight.Challenges;
            oldSight.Coordinates = newSight.Coordinates;


            var query = _context.Sights.Update(oldSight);
            SightVM vm3 = new SightVM()
            {
                SightId = oldSight.SightId,
                Info = oldSight.Info,
                Monument = oldSight.Monument,
                Name = oldSight.Name,
                Stop = oldSight.Stop,
                Coordinates = oldSight.Coordinates,
                Challenges = oldSight.Challenges
            };
            return vm3;
        }
    }
}
