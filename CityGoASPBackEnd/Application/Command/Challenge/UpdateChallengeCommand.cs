using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class UpdateChallengeCommand : IRequest<int>
    {
        public ChallengeVM ChallengeVM { get; set; }
        public UpdateChallengeCommand(ChallengeVM updateChallenge)
        {
            ChallengeVM = updateChallenge;
        }
    }
}
