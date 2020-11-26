using Application.Interfaces;
using Application.ViewModel;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, int>
    {
        IDBContext _context;
        public UpdateUserCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User newUser = new Domain.User() 
            {
                UserId = request.UserVM.UserId,
                Name = request.UserVM.Name, 
                Username = request.UserVM.Username, 
                Email = request.UserVM.Email, 
                Balls = request.UserVM.Balls, 
                UsersItems = request.UserVM.UsersItems 
            };
            /*
            if (request.UserVM.ItemsId != 0)
            {
                var item = await _context.Items.Where(c => c.ItemId == request.UserVM.ItemsId).SingleAsync();
                UsersItems usersItems = new UsersItems()
                {
                    User = newUser,
                    UserId = newUser.UserId,
                    Item = item,
                    ItemId = item.ItemId
                };
                if (request.UserVM.UsersItems == null)
                {
                    List<Domain.UsersItems> tussen = new List<Domain.UsersItems>();
                    tussen.Add(usersItems);
                    newUser.UsersItems = tussen;
                }
                else
                {
                    newUser.UsersItems.Add(usersItems);
                }
                if (item.UsersItems == null)
                {
                    List<Domain.UsersItems> tussen = new List<Domain.UsersItems>();
                    tussen.Add(usersItems);
                    item.UsersItems = tussen;
                }
                else
                {
                    item.UsersItems.Add(usersItems);
                }
            }
            if (request.UserVM.ChallengeId != 0)
            {
                var challenge = await _context.Challenges.Where(c => c.ChallengeId == request.UserVM.ChallengeId).SingleAsync();
                List<Domain.Challenge> challenges = new List<Domain.Challenge>();
                challenges.Add(challenge);
                newUser.Challenges = challenges;
            }
            */
            var olduser = await _context.Users.Where(u => u.UserId == newUser.UserId)
                .Include(c => c.Challenges)
                .Include(i => i.UsersItems)
                .SingleAsync();
            olduser.Name = newUser.Name;
            olduser.Username = newUser.Username;
            olduser.Email = newUser.Email;
            olduser.Balls = newUser.Balls;
            olduser.Challenges = newUser.Challenges;
            olduser.UsersItems = newUser.UsersItems;
            var query = _context.Users.Update(olduser);
            return await _context.SaveAsync(cancellationToken);
        }     
    }
}
