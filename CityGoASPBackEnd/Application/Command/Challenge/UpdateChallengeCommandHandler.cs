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
    public class UpdateChallengeCommandHandler : IRequestHandler<UpdateChallengeCommand, int>
    {
        IDBContext _context;
        public UpdateChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge newChallenge = new Domain.Challenge() 
            { 
                ChallengeId = request.ChallengeVM.ChallengeId,
                Name = request.ChallengeVM.Name, 
                Task = request.ChallengeVM.Task, 
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

            var oldChallenge = await _context.Challenges.Where(c => c.ChallengeId == newChallenge.ChallengeId)
                .Include(i => i.Items).SingleAsync();
            oldChallenge.Name = newChallenge.Name;
            oldChallenge.Task = newChallenge.Task;
            oldChallenge.Answer = newChallenge.Answer;
            oldChallenge.QuestionChallenge = newChallenge.QuestionChallenge;
            oldChallenge.Items = newItems;

            var query = _context.Challenges.Update(oldChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
