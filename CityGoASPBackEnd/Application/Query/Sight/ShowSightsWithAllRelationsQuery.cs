using Application.ViewModel;
using Application.ViewModel.Sight;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Sight
{
    public class ShowSightsWithAllRelationsQuery : IRequest<ListSightVM>
    {
    }
}
