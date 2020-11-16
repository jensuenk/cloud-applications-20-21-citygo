using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.User
{
    public class ShowAllUsersWithAllRelationsQuery : IRequest<ListUserVM>
    {
    }
}
