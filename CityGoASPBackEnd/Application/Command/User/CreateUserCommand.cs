using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command
{
    public class CreateUserCommand : IRequest<UserVM>
    {
        public UserVM UserVM { get; set; }
        public CreateUserCommand(UserVM newUser) 
        {
            UserVM = newUser;
        }
    }
}
