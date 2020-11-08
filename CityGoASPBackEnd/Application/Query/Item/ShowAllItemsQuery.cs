using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Item
{
    public class ShowAllItemsQuery : IRequest<ListItemVM>
    {
    }
}
