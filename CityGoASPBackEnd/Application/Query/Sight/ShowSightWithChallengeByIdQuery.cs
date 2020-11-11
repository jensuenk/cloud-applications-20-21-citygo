using Application.ViewModel.Item;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Sight
{
    public class ShowSightWithChallengeByIdQuery : IRequest<SightVM>
    {
        public int SightId { get; set; }
        public ShowSightWithChallengeByIdQuery(int id)
        {
            this.SightId = id;
        }
    }
}
