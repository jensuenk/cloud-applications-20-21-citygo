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
            var challenge = await _context.Challenges.Include(c => c.Items)
                                      .Where(c => c.ChallengeId == request.ChallengeId)
                                      .SingleAsync();
            ChallengeVM vm = new ChallengeVM() 
            { 
                ChallengeId = challenge.ChallengeId, 
                Name = challenge.Name, 
                Answer = challenge.Answer, 
                QuestionChallenge = challenge.QuestionChallenge, 
                Task = challenge.Task, 
                TaskDone = challenge.TaskDone, 
                Items = challenge.Items, 
                Sight = challenge.Sight 
            };

            return vm;
        }
    }
}
