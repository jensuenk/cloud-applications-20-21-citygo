using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query
{
    public class ShowUserByIdQuery: IRequest<UserVM>
    {
        public int UserId { get; set; }
        public ShowUserByIdQuery(int id)
        {
            this.UserId = id;
        }
    }
}
