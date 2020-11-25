using Application.Interfaces;
using Application.ViewModel;
using Application.ViewModel.Item;
using Application.ViewModel.Sight;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Sight
{
    public class ShowSightsWithAllRelationsQueryHandler : IRequestHandler<ShowSightsWithAllRelationsQuery, ListSightVM>
    {
    
        IDBContext _context;
        public ShowSightsWithAllRelationsQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ListSightVM> Handle(ShowSightsWithAllRelationsQuery request, CancellationToken cancellationToken)
        {
            var allSights = await _context.Sights
                 .Include(c => c.Challenges)
                 .Include(co => co.Coordinates)
                 .ToListAsync();

            ListSightVM vm = new ListSightVM();
            foreach (var sight in allSights)
            {
                vm.Sights.Add(new SightVM()
                {
                    SightId = sight.SightId,
                    Info = sight.Info,
                    Monument = sight.Monument,
                    Name = sight.Name,
                    Stop = sight.Stop,
                    Coordinates = sight.Coordinates,
                    Challenges = sight.Challenges
                });
            }
            return vm;
        }
    }
}
