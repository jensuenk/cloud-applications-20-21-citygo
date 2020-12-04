using Application.Interfaces;
using Application.ViewModel.Item;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Sight
{
    public class ShowSightByIdQueryHandler : IRequestHandler<ShowSightByIdQuery, SightVM>
    {
        IDBContext _context;
        public ShowSightByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<SightVM> Handle(ShowSightByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var sight = await _context.Sights.Where(s => s.SightId == request.SightId).SingleAsync();
                SightVM vm = new SightVM()
                {
                    SightId = sight.SightId,
                    Info = sight.Info,
                    Monument = sight.Monument,
                    Name = sight.Name,
                    Stop = sight.Stop,
                    Coordinates = sight.Coordinates
                };
                return vm;
            }
            catch (Exception)
            {
                SightVM vm = new SightVM()
                {
                    Error = "NotFound"
                };
                return vm;
            }  
        }
    }
}
