using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class DeleteFriendCommand : IRequest<int>
    {
        public int UserId { get; set; }
        public int FriendId { get; set; }
        public DeleteFriendCommand(int uid, int fid)
        {
            this.UserId = uid;
            this.FriendId = fid;
        }
    }
}
