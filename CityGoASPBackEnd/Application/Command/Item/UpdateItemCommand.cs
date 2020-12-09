using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Item
{
    public class UpdateItemCommand : IRequest<int>
    {
        public ItemVM ItemVM { get; set; }
        public UpdateItemCommand(ItemVM updateItem)
        {
            ItemVM = updateItem;
        }
    }
}
