using Application.Interfaces;
using Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Item
{
    public class ShowAllItemsQueryHandler : IRequestHandler<ShowAllItemsQuery, ListItemVM>
    {
        IDBContext _context;
        public ShowAllItemsQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<ListItemVM> Handle(ShowAllItemsQuery request, CancellationToken cancellationToken)
        {
            var allItems = await _context.Items
                .Include(c => c.Location)
                .ToListAsync();

            ListItemVM vm = new ListItemVM();
            foreach (var item in allItems)
            {
                vm.Items.Add(new ItemVM() 
                { 
                    ItemId = item.ItemId,
                    Name = item.Name, 
                    Location = item.Location, 
                    Picture = item.Picture, 
                    Rarity = item.Rarity
                });
            }
            return vm;
        }
    }
}
