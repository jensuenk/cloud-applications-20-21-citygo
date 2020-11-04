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

namespace Application.Query.User
{
    public class ShowUserWithItemByIdQueryHandler : IRequestHandler<ShowUserWithItemByIdQuery, UserVM>
    {
        IDBContext _context;
        public ShowUserWithItemByIdQueryHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<UserVM> Handle(ShowUserWithItemByIdQuery request, CancellationToken cancellationToken)
        {
            //var user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();
            var user = await _context.Users.Include(u => u.Items)
                                      .Where(u => u.UserId == request.UserId)
                                      .SingleAsync();
            //List<ItemVM> itemList = new List<ItemVM>();
            //ItemVM itemsingle = new ItemVM();
          
            UserVM vm = new UserVM() { UserId = user.UserId, Name = user.Name, Username = user.Username, Email = user.Email, Balls = user.Balls, Items = user.Items };

            //foreach (var item in user.Items)
            //{
            //    itemsingle.Name = item.Name;
            //    itemsingle.Location = item.Location;
            //    itemsingle.Rarity = item.Rarity;
            //    itemsingle.Picture = item.Picture;
            //    itemList.Add(itemsingle);
            //}
            
            return vm;

        }

    }
}
