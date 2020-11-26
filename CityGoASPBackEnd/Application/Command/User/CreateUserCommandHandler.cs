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
                UserId = request.UserVM.UserId, 
                Name = request.UserVM.Name, 
                Username = request.UserVM.Username, 
                Email = request.UserVM.Email, 
                Balls = request.UserVM.Balls
            };
            /*
            
            if (request.UserVM.ItemsId != 0 )
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

            // Link existing useritems to a user trough the body
            List<Domain.UsersItems> newUserItems = new List<Domain.UsersItems>();
            foreach (var usersItem in request.UserVM.UsersItems)
            {
                // Check if useritem exists, if so, add it to a list to asign later
                var foundUserItem = _context.UsersItems.Find(usersItem.ItemId);
                if (foundUserItem != null)
                {
                    newUserItems.Add(foundUserItem);
                }
            }
            // Assign the list to the user's useritems
            newUser.UsersItems = newUserItems;
            */


            // Link existing challenges to a user trough the body
            List<Domain.Challenge> newChallenges = new List<Domain.Challenge>();
            foreach (var challenge in request.UserVM.Challenges)
            {
                // Check if challenge exists, if so, add it to a list to asign later
                var foundChallenge = _context.Challenges.Find(challenge.ChallengeId);
                if (foundChallenge != null)
                {
                    newChallenges.Add(foundChallenge);
                }
            }
            // Assign the list to the user's challenges
            newUser.Challenges = newChallenges;
            

            var query = _context.Users.Add(newUser);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
