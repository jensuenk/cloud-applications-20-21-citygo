using Application.ViewModel.Item;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Sight
{
    public class ShowSightByIdQuery : IRequest<SightVM>
    {
        public int SightId { get; set; }
        public ShowSightByIdQuery(int id)
        {
            this.SightId = id;
        }
    }
}
