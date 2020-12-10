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
            Domain.User newUser;
            try
            {
                newUser = new Domain.User()
                {
                    UserId = request.UserVM.UserId,
                    Name = request.UserVM.Name,
                    Username = request.UserVM.Username,
                    Email = request.UserVM.Email,
                    Balls = request.UserVM.Balls
                };
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "BadRequest_User" };
                return 4001;
            }


            // Link existing useritems to a user trough the body
            List<Domain.UsersItems> newUserItems = new List<Domain.UsersItems>(); ;
            try
            {
                if (request.UserVM.Items != null)
                {
                    foreach (var usersItem in request.UserVM.Items)
                    {
                        // Check if item exists, if so, create a new userItem and add it to a list to asign later
                        var foundItem = _context.Items.Find(usersItem.ItemId);
                        if (foundItem != null)
                        {
                            UsersItems usersItems = new UsersItems()
                            {
                                User = newUser,
                                UserId = newUser.UserId,
                                Item = foundItem,
                                ItemId = foundItem.ItemId
                            };
                            newUserItems.Add(usersItems);
                        }
                    }
                }
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Item" };
                return 4041;
            }
            
            // Assign the list to the user's useritems
            newUser.UsersItems = newUserItems;


            // Link existing challenges to a user trough the body
            List<Domain.Challenge> newChallenges = new List<Domain.Challenge>(); ;
            try
            {
                if (request.UserVM.Challenges != null)
                {
                    foreach (var challenge in request.UserVM.Challenges)
                    {
                        // Check if challenge exists, if so, add it to a list to asign later
                        var foundChallenge = _context.Challenges.Find(challenge.ChallengeId);
                        if (foundChallenge != null)
                        {
                            newChallenges.Add(foundChallenge);
                        }
                    }
                }
            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Challenge" };
                return 4042;
            }
            
            // Assign the list to the user's challenges
            newUser.Challenges = newChallenges;
            

            var query = _context.Users.Add(newUser);
            UserVM vm3 = new UserVM()
            {
                UserId = newUser.UserId,
                Name = newUser.Name,
                Balls = newUser.Balls,
                Challenges = newUser.Challenges,
                Email = newUser.Email,
                Username = newUser.Username,
                UsersItems = newUser.UsersItems,
                Error = "OK",
            };
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
