using Application.Interfaces;
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
    public class AddFriendCommandHandler : IRequestHandler<AddFriendCommand, int>
    {
        IDBContext _context;
        public AddFriendCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddFriendCommand request, CancellationToken cancellationToken)
        {
            Domain.User newUser = new Domain.User()
            {
                
            };
            List<int> tussen = new List<int>();
            for (int i = 0; i < request.UserVM.FriendId.Length; i++)
            {
                if (request.UserVM.FriendId[i] != 0)
                {
                    var user = await _context.Users.Where(u => u.UserId == request.UserVM.FriendId[i]).SingleAsync();
                    tussen.Add(user.UserId);
                    newUser.Friends = tussen;
                }
            }
            var olduser = await _context.Users.Where(u => u.UserId == newUser.UserId).SingleAsync();
            olduser.Friends = newUser.Friends;
            var query = _context.Users.Update(olduser);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
