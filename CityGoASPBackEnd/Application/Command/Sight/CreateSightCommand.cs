using Application.ViewModel.Item;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Sight
{
    public class CreateSightCommand : IRequest<SightVM>
    {
        public SightVM SightVM { get; set; }
        public CreateSightCommand(SightVM newSight)
        {
            SightVM = newSight;
        }
    }
}
