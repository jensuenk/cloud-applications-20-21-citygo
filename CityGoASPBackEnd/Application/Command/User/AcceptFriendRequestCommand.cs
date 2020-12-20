using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class AcceptFriendRequestCommand : IRequest<int>
    {
        public int UserId { get; set; }
        public int FriendId { get; set; }
        public AcceptFriendRequestCommand(int uid, int fid)
        {
            this.UserId = uid;
            this.FriendId = fid;
        }
    }
}
