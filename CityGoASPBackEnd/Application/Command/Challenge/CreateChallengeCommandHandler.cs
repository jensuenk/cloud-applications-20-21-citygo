using Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
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
                ChallengeId = request.Challenge.ChallengeId, 
                Name = request.Challenge.Name, 
                Task = request.Challenge.Task , 
                Answer = request.Challenge.Answer, 
                QuestionChallenge =request.Challenge.QuestionChallenge
            };
            var query = _context.Challenges.Add(newChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
