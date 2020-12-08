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
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserVM>
    {
        IDBContext _context;
        public UpdateUserCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<UserVM> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
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
                return vm1;
            }


            // Link existing useritems to a user trough the body
            List<Domain.UsersItems> newUserItems;
            try
            {
                newUserItems = new List<Domain.UsersItems>();
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
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Item" };
                return vm1;
            }

            // Assign the list to the user's useritems
            newUser.UsersItems = newUserItems;


            // Link existing challenges to a user trough the body
            List<Domain.Challenge> newChallenges;
            try
            {
                newChallenges = new List<Domain.Challenge>();
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
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Challenge" };
                return vm1;
            }

            // Assign the list to the user's challenges
            newUser.Challenges = newChallenges;

            var olduser = await _context.Users.Where(u => u.UserId == newUser.UserId)
                .Include(c => c.Challenges)
                .Include(i => i.UsersItems)
                .SingleAsync();
            olduser.Name = newUser.Name;
            olduser.Username = newUser.Username;
            olduser.Email = newUser.Email;
            olduser.Balls = newUser.Balls;
            olduser.Challenges = newChallenges;
            olduser.UsersItems = newUserItems;
            var query = _context.Users.Update(olduser);
            UserVM vm3 = new UserVM()
            {
                UserId = olduser.UserId,
                Name = olduser.Name,
                Balls = olduser.Balls,
                Challenges = olduser.Challenges,
                Email = olduser.Email,
                Username = olduser.Username,
                UsersItems = olduser.UsersItems,
                Error = "OK",
            };
            return vm3;
        }     
    }
}
