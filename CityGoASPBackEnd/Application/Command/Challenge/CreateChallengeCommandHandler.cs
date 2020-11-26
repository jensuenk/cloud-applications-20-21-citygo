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
                QuestionChallenge = request.ChallengeVM.QuestionChallenge
            };

            // Link existing Items to a challenge trough the body
            List<Domain.Item> newItems = new List<Domain.Item>();
            foreach (var item in request.ChallengeVM.Items)
            {
                // Check if Items exists, if so, add it to a list to asign later
                var foundItem = _context.Items.Find(item.ItemId);
                if (foundItem != null)
                {
                    newItems.Add(foundItem);
                }
            }
            // Assign the list to the challenge's items
            newChallenge.Items = newItems;
          
            var query = _context.Challenges.Add(newChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
