using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Item
{
    public class CreateItemCommand : IRequest<int>
    {
        public ItemVM Item { get; set; }
        public CreateItemCommand(ItemVM newItem)
        {
            Item = newItem;
        }
    }
}
