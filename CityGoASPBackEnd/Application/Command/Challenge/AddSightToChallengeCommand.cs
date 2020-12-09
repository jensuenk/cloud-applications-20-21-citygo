using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class AddSightToChallengeCommand : IRequest<int>
    {
        public int ChallengeId { get; set; }
        public int SightId { get; set; }
        public AddSightToChallengeCommand(int cid, int sid)
        {
            this.ChallengeId = cid;
            this.SightId = sid;
        }
    }
}
