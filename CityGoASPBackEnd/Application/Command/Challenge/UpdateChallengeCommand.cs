using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class UpdateChallengeCommand : IRequest<int>, IRequest<ChallengeVM>
    {
        public ChallengeVM Challenge { get; set; }
        public UpdateChallengeCommand(ChallengeVM updateChallenge)
        {
            Challenge = updateChallenge;
        }
    }
}
