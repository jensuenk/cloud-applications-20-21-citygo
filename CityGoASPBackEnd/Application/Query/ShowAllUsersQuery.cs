using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query
{
    public class ShowAllUsersQuery: IRequest<ListUserVM>
    {

    }
}
