using Application.ViewModel;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Item
{
    public class ShowItemByIdQuery : IRequest<ItemVM>
    {
        public int ItemId { get; set; }
        public ShowItemByIdQuery(int id)
        {
            this.ItemId = id;
        }
    }
}
