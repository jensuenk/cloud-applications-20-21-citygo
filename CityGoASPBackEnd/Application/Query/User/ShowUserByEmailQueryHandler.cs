
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
    public class ShowUserByEmailQueryHandler : IRequestHandler<ShowUserByEmailQuery, UserVM>
    {
        IDBContext _context;
        public ShowUserByEmailQueryHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<UserVM> Handle(ShowUserByEmailQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _context.Users.Where(u => u.Email == request.Email)
               .SingleAsync();

                UserVM vm = new UserVM()
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Username = user.Username,
                    Email = user.Email,
                    Balls = user.Balls,
                    Score = user.Score,
                    Friends = user.Friends,
                    PicrtureURL = user.PicrtureURL,
                    Online = user.Online,
                    Location = user.Location
                };
                return vm;
            }
            catch (Exception)
            {
                UserVM vm = new UserVM()
                {
                    Error = "NotFound_Mail"
                };
                return vm;
            }
        }
    }
}
