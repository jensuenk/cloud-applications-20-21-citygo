using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command
{
    public class CreateUserCommand : IRequest<int>
    {
        public UserVM User { get; set; }
        public CreateUserCommand(UserVM newUser) 
        {
            User = newUser;
        }
    }
}
