using Application.Interfaces;
using Application.ViewModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query
{
    public class ShowAllUsersQueryHandler : IRequestHandler<ShowAllUsersQuery, ListUserVM>
    {
        IDBContext _context;
        public ShowAllUsersQueryHandler(IDBContext context) 
        {
            _context = context;
        }
        public async Task<ListUserVM> Handle(ShowAllUsersQuery request, CancellationToken cancellationToken)
        {
            var allUsers = await _context.Users.ToListAsync();

            ListUserVM vm = new ListUserVM();
            foreach (var item in allUsers)
            {
                vm.Users.Add(new UserVM() { UserId = item.UserId, Name = item.Name, Username = item.Username, Balls = item.Balls, Email = item.Email });
            }
            return vm;
        }
    }
}
