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
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
        IDBContext _context;
        public CreateUserCommandHandler(IDBContext context) 
        {
            _context = context;
        }
        public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User newUser = new Domain.User()
            {
                UserId = request.User.UserId, 
                Name = request.User.Name, 
                Username = request.User.Username, 
                Email = request.User.Email, 
                Balls = request.User.Balls
            };
           
            if (request.User.ItemsId != null)
            {
                var item = await _context.Items.Where(c => c.ItemId == request.User.ItemsId).SingleAsync();
                UsersItems usersItems = new UsersItems()
                {
                    User = newUser,
                    UserId = newUser.UserId,
                    Item = item,
                    ItemId = item.ItemId
                };
                if (request.User.UsersItems == null)
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
            if (request.User.ChallengeId != null)
            {
                var challenge = await _context.Challenges.Where(c => c.ChallengeId == request.User.ChallengeId).SingleAsync();
                List<Domain.Challenge> challenges = new List<Domain.Challenge>();
                challenges.Add(challenge);
                newUser.Challenges = challenges;
            }
            var query = _context.Users.Add(newUser);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
