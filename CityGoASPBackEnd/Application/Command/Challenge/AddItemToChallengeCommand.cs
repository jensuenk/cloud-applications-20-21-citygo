using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Challenge
{
    public class AddItemToChallengeCommand : IRequest<int>
    {
        public int ChallengeId { get; set; }
        public int ItemId { get; set; }
        public AddItemToChallengeCommand(int cid, int iid)
        {
            this.ChallengeId = cid;
            this.ItemId = iid;
        }
    }
}
