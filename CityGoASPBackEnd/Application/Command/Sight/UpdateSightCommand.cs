using Application.ViewModel.Item;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Sight
{
    public class UpdateSightCommand : IRequest<int>, IRequest<SightVM>
    {
        public SightVM Sight { get; set; }
        public UpdateSightCommand(SightVM updateSight)
        {
            Sight = updateSight;
        }
    }
}
