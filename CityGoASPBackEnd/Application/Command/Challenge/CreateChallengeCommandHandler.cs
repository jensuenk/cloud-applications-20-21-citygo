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
    public class CreateChallengeCommandHandler : IRequestHandler<CreateChallengeCommand, int>
    {
        IDBContext _context;
        public CreateChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge newChallenge = new Domain.Challenge() 
            { 
                ChallengeId = request.ChallengeVM.ChallengeId, 
                Name = request.ChallengeVM.Name, 
                Task = request.ChallengeVM.Task , 
                Answer = request.ChallengeVM.Answer, 
                QuestionChallenge =request.ChallengeVM.QuestionChallenge
            };

            if (request.ChallengeVM.SightId != 0)
            {
                var sight = await _context.Sights.Where(s => s.SightId == request.ChallengeVM.SightId).SingleAsync();
                newChallenge.Sight = sight;
            }

            if (request.ChallengeVM.UserId != 0)
            {
                var user = await _context.Users.Where(s => s.UserId == request.ChallengeVM.UserId).SingleAsync();
                newChallenge.User = user;
            }

            List<Domain.Item> tussen = new List<Domain.Item>();
            for (int i = 0; i < request.ChallengeVM.ItemIds.Length; i++)
            {
                if (request.ChallengeVM.ItemIds[i] != 0)
                {
                    var id = request.ChallengeVM.ItemIds[i];
                    var item = await _context.Items.Where(i => i.ItemId == id).SingleAsync();
                    tussen.Add(item);
                    newChallenge.Items = tussen;
                }
            }
          
            var query = _context.Challenges.Add(newChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
