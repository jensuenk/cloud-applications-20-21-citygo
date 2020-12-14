using Application.Interfaces;
using Application.ViewModel.Challenge;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Challenge
{
    public class ShowAllChallengesQueryHandler : IRequestHandler<ShowAllChallengesQuery, ListChallengeVM>
    {
        IDBContext _context;
        public ShowAllChallengesQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ListChallengeVM> Handle(ShowAllChallengesQuery request, CancellationToken cancellationToken)
        {
            var allChallenge = await _context.Challenges
                .Include(i => i.Items)
                .ToListAsync();

            ListChallengeVM vm = new ListChallengeVM();
            foreach (var challenge in allChallenge)
            {
                vm.Challenges.Add(new ChallengeVM()
                {
                    ChallengeId = challenge.ChallengeId,
                    Name = challenge.Name,
                    Task = challenge.Task,
                    Answer = challenge.Answer,
                    QuestionChallenge = challenge.QuestionChallenge,
                    Items = challenge.Items,
                    Score = challenge.Score,
                });
            }
            return vm;
        }
    }
}
