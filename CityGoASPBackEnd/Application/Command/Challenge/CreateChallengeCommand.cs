using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class CreateChallengeCommand : IRequest<int>
    {
        public ChallengeVM Challenge { get; set; }
        public CreateChallengeCommand(ChallengeVM newChallenge)
        {
            Challenge = newChallenge;
        }
    }
}
