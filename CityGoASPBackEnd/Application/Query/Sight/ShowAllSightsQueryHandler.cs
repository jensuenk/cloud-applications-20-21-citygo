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
            double[,] tussen= new double[4,2];
            ListSightVM vm = new ListSightVM();
            foreach (var sight in allSights)
            {
                tussen[0, 0] = sight.Latitude1;
                tussen[1, 0] = sight.Latitude2;
                tussen[2, 0] = sight.Latitude3;
                tussen[3, 0] = sight.Latitude4;

                tussen[0, 1] = sight.Longitude1;
                tussen[1, 1] = sight.Longitude2;
                tussen[2, 1] = sight.Longitude3;
                tussen[3, 1] = sight.Longitude4;
                vm.Sights.Add(new SightVM() 
                { 
                    SightId = sight.SightId, 
                    Info = sight.Info, 
                    Monument= sight.Monument, 
                    Name= sight.Name, 
                    Stop = sight.Stop, 
                    Polygon = tussen 
                });
               
            }
            return vm;
        }
    }
}
