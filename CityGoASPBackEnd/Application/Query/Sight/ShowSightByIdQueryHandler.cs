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
            var sight = await _context.Sights.Where(s => s.SightId == request.SightId).SingleAsync();
            double[,] tussen = new double[4,2];
            tussen[0, 0] = sight.Latitude1;
            tussen[0, 1] = sight.Longitude1;
            tussen[1, 0] = sight.Latitude2;
            tussen[1, 1] = sight.Longitude2;
            tussen[2, 0] = sight.Latitude3;
            tussen[2, 1] = sight.Longitude3;
            tussen[3, 0] = sight.Latitude4;
            tussen[3, 1] = sight.Longitude4;
            SightVM vm = new SightVM() 
            { 
                SightId = sight.SightId,
                Info = sight.Info, 
                Monument = sight.Monument, 
                Name = sight.Name,
                Stop = sight.Stop , 
                Polygon = tussen
            };
            return vm;
        }
    }
}
