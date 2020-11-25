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

            List<Domain.Coordinate> tussen1 = new List<Domain.Coordinate>();
            for (int i = 0; i < request.SightVM.CoordinateIds.Length; i++)
            {
                if (request.SightVM.CoordinateIds[i] != 0)
                {
                    var id = request.SightVM.CoordinateIds[i];
                    var coordinate = await _context.Coordinates.Where(i => i.CoordinateId == id).SingleAsync();
                    tussen1.Add(coordinate);
                    newSight.Coordinates = tussen1;
                }
            }

            List<Domain.Challenge> tussen2 = new List<Domain.Challenge>();
            for (int i = 0; i < request.SightVM.CoordinateIds.Length; i++)
            {
                if (request.SightVM.ChallengeIds[i] != 0)
                {
                    var id = request.SightVM.ChallengeIds[i];
                    var challenge = await _context.Challenges.Where(i => i.ChallengeId == id).SingleAsync();
                    tussen2.Add(challenge);
                    newSight.Challenges = tussen2;
                }
            }

           
            var oldSight = await _context.Sights.Where(s => s.SightId == newSight.SightId)
                .Include(c => c.Coordinates)
                .SingleAsync();
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
