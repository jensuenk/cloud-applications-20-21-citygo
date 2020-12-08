using Application.ViewModel.Item;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Command.Sight
{
    public class DeleteSightCommand : IRequest<SightVM>
    {
        public int SightId { get; set; }
        public DeleteSightCommand(int id)
        {
            this.SightId = id;
        }
    }
}
