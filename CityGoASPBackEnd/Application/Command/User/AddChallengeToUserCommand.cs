using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class AddChallengeToUserCommand : IRequest<int>
    {
        public int UserId { get; set; }
        public int ChallengeId { get; set; }
        public AddChallengeToUserCommand(int uid, int cid)
        {
            this.UserId = uid;
            this.ChallengeId = cid;
        }
    }
}
