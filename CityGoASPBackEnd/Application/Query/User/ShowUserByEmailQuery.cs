using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.User
{
    public class ShowUserByEmailQuery: IRequest<UserVM>
    {
        public string Email { get; set; }
        public ShowUserByEmailQuery(string e)
        {
            Email = e;
        }
    }
}
