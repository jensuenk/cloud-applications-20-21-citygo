using Application.Interfaces;
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
            Domain.Sight newSight = new Domain.Sight() 
            { 
                SightId = request.SightVM.SightId,
                Info = request.SightVM.Info,
                Monument = request.SightVM.Monument, 
                Name = request.SightVM.Name, 
                Stop = request.SightVM.Stop 
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

            var query = _context.Sights.Add(newSight);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
