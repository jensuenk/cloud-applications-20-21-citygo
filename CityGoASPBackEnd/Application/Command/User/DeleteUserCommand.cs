using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.User
{
    public class DeleteUserCommand : IRequest<UserVM>
    {
        public int UserId { get; set; }
        public DeleteUserCommand(int id)
        {
            this.UserId = id;
        }
    }
}
