using Application.Interfaces;
using Application.ViewModel.Item;
using Domain;
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
    public class CreateSightCommandHandler : IRequestHandler<CreateSightCommand, int>
    {
        IDBContext _context;
        public CreateSightCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateSightCommand request, CancellationToken cancellationToken)
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
                return 4001;
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
                return 4041;
            }
            
            // Assign the list to the sight's challenges
            newSight.Challenges = newChallenges;

            var query = _context.Sights.Add(newSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
