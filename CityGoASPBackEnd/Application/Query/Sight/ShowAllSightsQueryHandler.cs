using Application.Interfaces;
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
    public class ShowAllSightsQueryHandler : IRequestHandler<ShowAllSightsQuery, ListSightVM>
    {
        IDBContext _context;
        public ShowAllSightsQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<ListSightVM> Handle(ShowAllSightsQuery request, CancellationToken cancellationToken)
        {
            var allSights = await _context.Sights.ToListAsync();

            ListSightVM vm = new ListSightVM();
            foreach (var sight in allSights)
            {
                vm.Sights.Add(new SightVM() { SightId = sight.SightId, Info = sight.Info, Location = sight.Location, Monument= sight.Monument, Name= sight.Name, Stop = sight.Stop });
            }
            return vm;
        }
    }
}
