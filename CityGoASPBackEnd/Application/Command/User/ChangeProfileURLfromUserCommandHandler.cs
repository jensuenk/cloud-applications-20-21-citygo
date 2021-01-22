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

namespace Application.Command.User
{
    public class ChangeProfileURLfromUserCommandHandler : IRequestHandler<ChangeProfileURLfromUserCommand, int>
    {
        IDBContext _context;
        public ChangeProfileURLfromUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(ChangeProfileURLfromUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User newUser;
            Domain.User olduser;
            try
            {

                newUser = new Domain.User()
                {
                    UserId = request.UserVM.UserId,
                    PicrtureURL = request.UserVM.PicrtureURL
                };
                olduser = await _context.Users.Where(u => u.UserId == newUser.UserId)
                    .SingleAsync();
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "BadRequest_User" };
                return 4001;
            }

            olduser.PicrtureURL = newUser.PicrtureURL;
            var query = _context.Users.Update(olduser);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
