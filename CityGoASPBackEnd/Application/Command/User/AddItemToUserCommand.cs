using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class AddItemToUserCommand : IRequest<UserVM>
    {
        public int UserId { get; set; }
        public int ItemId { get; set; }
        public AddItemToUserCommand(int uid, int iid)
        {
            this.UserId = uid;
            this.ItemId = iid;
        }
    }
}
