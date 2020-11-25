using Application.Interfaces;
using Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Item
{
    public class ShowItemByIdQueryHandler : IRequestHandler<ShowItemByIdQuery, ItemVM>
    {
        IDBContext _context;
        public ShowItemByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<ItemVM> Handle(ShowItemByIdQuery request, CancellationToken cancellationToken)
        {
            var item = await _context.Items.Where(i => i.ItemId == request.ItemId).Include(c => c.Location).SingleAsync();
            ItemVM vm = new ItemVM() 
            { 
                ItemId = item.ItemId, 
                Name = item.Name, 
                Location = item.Location, 
                Picture = item.Picture, 
                Rarity = item.Rarity 
            };
            return vm;
        }
    }
}
