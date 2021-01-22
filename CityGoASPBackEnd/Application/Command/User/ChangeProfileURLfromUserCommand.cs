using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class ChangeProfileURLfromUserCommand : IRequest<int>
    {
        public UserVM UserVM { get; set; }
        public ChangeProfileURLfromUserCommand(UserVM updateUser)
        {
            UserVM = updateUser;
        }
    }
}
