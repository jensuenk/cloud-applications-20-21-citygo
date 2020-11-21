using Application.ViewModel.Item;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Sight
{
    public class UpdateSightCommand : IRequest<int>, IRequest<SightVM>
    {
        public SightVM SightVM { get; set; }
        public UpdateSightCommand(SightVM updateSight)
        {
            SightVM = updateSight;
        }
    }
}
