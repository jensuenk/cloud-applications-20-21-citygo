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
    public class ShowChallengeByIdQueryHandler : IRequestHandler<ShowChallengeByIdQuery, ChallengeVM>
    {
        IDBContext _context;
        public ShowChallengeByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ChallengeVM> Handle(ShowChallengeByIdQuery request, CancellationToken cancellationToken)
        {
            var challenge = await _context.Challenges.Where(c => c.ChallengeId == request.ChallengeId).SingleAsync();
            ChallengeVM vm = new ChallengeVM() 
            { 
                ChallengeId = challenge.ChallengeId, 
                Name = challenge.Name, 
                Task = challenge.Task, 
                Answer = challenge.Answer, 
                QuestionChallenge = challenge.QuestionChallenge 
            };
            return vm;
        }
    }
}
