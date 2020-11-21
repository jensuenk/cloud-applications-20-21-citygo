using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class AddFriendCommand : IRequest<int>, IRequest<UserVM>
    {
        public UserVM UserVM { get; set; }
        public AddFriendCommand(UserVM updateUser)
        {
            UserVM = updateUser;
        }
    }
}
