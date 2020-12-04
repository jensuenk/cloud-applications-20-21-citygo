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
    public class ShowChallengeWithSightByIdQueryHandler : IRequestHandler<ShowChallengeWithSightByIdQuery, ChallengeVM>
    {
        IDBContext _context;
        public ShowChallengeWithSightByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ChallengeVM> Handle(ShowChallengeWithSightByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var challenge = await _context.Challenges.Include(c => c.Sight)
                                   .Where(c => c.ChallengeId == request.ChallengeId)
                                   .SingleAsync();
                ChallengeVM vm = new ChallengeVM()
                {
                    ChallengeId = challenge.ChallengeId,
                    Name = challenge.Name,
                    Answer = challenge.Answer,
                    QuestionChallenge = challenge.QuestionChallenge,
                    Task = challenge.Task,
                    Items = challenge.Items,
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
