using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.User
{
    public class ShowUserWithItemByIdQuery : IRequest<UserVM>
    {
        public int UserId { get; set; }
        public ShowUserWithItemByIdQuery(int id)
        {
            this.UserId = id;
        }
    }
}
