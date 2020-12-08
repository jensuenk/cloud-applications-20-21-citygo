using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command
{
    public class UpdateUserCommand : IRequest<UserVM>
    {
        public UserVM UserVM { get; set; }
        public UpdateUserCommand(UserVM updateUser)
        {
            UserVM = updateUser;
        }
    }
}
