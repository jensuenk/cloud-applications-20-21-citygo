using Application.Interfaces;
using Application.ViewModel.Challenge;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Challenge
{
    public class ShowChallengeWithItemByIdQueryHandler : IRequestHandler<ShowChallengeWithItemByIdQuery, ChallengeVM>
    {
        IDBContext _context;
        public ShowChallengeWithItemByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ChallengeVM> Handle(ShowChallengeWithItemByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var challenge = await _context.Challenges.Include(c => c.Items)
                                      .Where(c => c.ChallengeId == request.ChallengeId)
                                      .Include(i => i.Items)
                                      .SingleAsync();
                ChallengeVM vm = new ChallengeVM()
                {
                    ChallengeId = challenge.ChallengeId,
                    Name = challenge.Name,
                    Answer = challenge.Answer,
                    QuestionChallenge = challenge.QuestionChallenge,
                    Task = challenge.Task,
                    Items = challenge.Items,
                    Score = challenge.Score,
                    Balls = challenge.Balls,
                    Sight = challenge.Sight
                };

                return vm;
            }
            catch (Exception)
            {

                ChallengeVM vm = new ChallengeVM()
                {
                    Error = "NotFound"
                };
                return vm;
            }
            
        }
    }
}
