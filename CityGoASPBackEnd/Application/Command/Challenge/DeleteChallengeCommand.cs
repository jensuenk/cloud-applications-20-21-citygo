using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    class DeleteChallengeCommand : IRequest<int>
    {
        public int ChallengeId { get; set; }
        public DeleteChallengeCommand(int id)
        {
            this.ChallengeId = id;
        }
    }
}
