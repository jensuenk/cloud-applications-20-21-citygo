using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class DeleteChallengeCommand : IRequest<ChallengeVM>
    {
        public int ChallengeId { get; set; }
        public DeleteChallengeCommand(int id)
        {
            this.ChallengeId = id;
        }
    }
}
