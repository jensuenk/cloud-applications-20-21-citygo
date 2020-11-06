using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Item
{
    public class DeleteItemCommand : IRequest<int>
    {
        public int ItemId { get; set; }
        public DeleteItemCommand(int id)
        {
            this.ItemId = id;
        }
    }
}
