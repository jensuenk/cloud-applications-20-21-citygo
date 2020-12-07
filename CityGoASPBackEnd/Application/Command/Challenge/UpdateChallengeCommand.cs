using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class UpdateChallengeCommand : IRequest<ChallengeVM>
    {
        public ChallengeVM ChallengeVM { get; set; }
        public UpdateChallengeCommand(ChallengeVM updateChallenge)
        {
            ChallengeVM = updateChallenge;
        }
    }
}
