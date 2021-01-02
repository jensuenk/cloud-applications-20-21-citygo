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
                if (request.UserVM.Name != null && request.UserVM.Username != null && request.UserVM.Email != null && request.UserVM.Balls !=  null)
                {
                    newUser = new Domain.User()
                    {
                        UserId = request.UserVM.UserId,
                        Name = request.UserVM.Name,
                        Username = request.UserVM.Username,
                        Email = request.UserVM.Email,
                        Balls = request.UserVM.Balls,
                        Score = request.UserVM.Score,
                        PicrtureURL = request.UserVM.PicrtureURL
                    };
                }
                else
                {
                    return 4001;
                }
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
            List<Domain.UsersChallenges> newChallenges = new List<Domain.UsersChallenges>(); ;
            try
            {
                if (request.UserVM.UsersChallenges != null)
                {
                    foreach (var challenge in request.UserVM.UsersChallenges)
                    {
                        // Check if challenge exists, if so, add it to a list to asign later
                        var foundChallenge = _context.Challenges.Find(challenge.ChallengeId);
                        if (foundChallenge != null)
                        {
                            UsersChallenges usersChallenges = new UsersChallenges()
                            {
                                User = newUser,
                                UserId = newUser.UserId,
                                Challenge = foundChallenge,
                                ChallengeId = foundChallenge.ChallengeId
                            };
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
            newUser.UsersChallenges = newChallenges;


            int localScore = 0;
            if (newChallenges != null)
            {
                foreach (var chal in newUser.UsersChallenges)
                {
                    var foundChallenge = _context.Challenges.Find(chal.ChallengeId);
                    localScore += foundChallenge.Score;
                }
            }
            newUser.Score = localScore;

            var query = _context.Users.Add(newUser);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
