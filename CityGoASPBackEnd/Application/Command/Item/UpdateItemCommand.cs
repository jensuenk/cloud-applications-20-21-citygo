using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Item
{
    public class UpdateItemCommand : IRequest<int>, IRequest<ItemVM>
    {
        public ItemVM Item { get; set; }
        public UpdateItemCommand(ItemVM updateItem)
        {
            Item = updateItem;
        }
    }
}
