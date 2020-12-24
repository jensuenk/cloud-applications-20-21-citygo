using Application.Interfaces;
using Application.ViewModel.Challenge;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Challenge
{
    public class CreateChallengeCommandHandler : IRequestHandler<CreateChallengeCommand, int>
    {
        IDBContext _context;
        public CreateChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge newChallenge;
            try
            {
                if (request.ChallengeVM.Name != null &&  request.ChallengeVM.Task!= null && request.ChallengeVM.Answer != null && request.ChallengeVM.QuestionChallenge != null)
                {
                    newChallenge = new Domain.Challenge()
                    {
                        ChallengeId = request.ChallengeVM.ChallengeId,
                        Name = request.ChallengeVM.Name,
                        Task = request.ChallengeVM.Task,
                        Answer = request.ChallengeVM.Answer,
                        QuestionChallenge = request.ChallengeVM.QuestionChallenge,
                        Score = request.ChallengeVM.Score
                    };
                }
                else
                {
                    return 4001;
                }
            }
            catch (Exception)
            {
                ChallengeVM vm1 = new ChallengeVM() { Error = "BadRequest_Challenge" };
                return 4001;
            }


            // Link existing Items to a challenge trough the body
            List<Domain.Item> newItems = new List<Domain.Item>(); ;
            try
            {
                if (request.ChallengeVM.Items != null)
                {
                    foreach (var item in request.ChallengeVM.Items)
                    {
                        // Check if Items exists, if so, add it to a list to asign later
                        var foundItem = _context.Items.Find(item.ItemId);
                        if (foundItem != null)
                        {
                            newItems.Add(foundItem);
                        }
                    }
                }
            }
            catch (Exception)
            {
                ChallengeVM vm2 = new ChallengeVM() { Error = "NotFound_Item" };
                return 4042;
            }


            // Link existing challenges to a user trough the body
            List<Domain.UsersChallenges> newUser = new List<Domain.UsersChallenges>(); ;
            try
            {
                if (request.ChallengeVM.UsersChallenges != null)
                {
                    foreach (var user in request.ChallengeVM.UsersChallenges)
                    {
                        // Check if challenge exists, if so, add it to a list to asign later
                        var foundUser = _context.Users.Find(user.UserId);
                        if (foundUser != null)
                        {
                            UsersChallenges usersChallenges = new UsersChallenges()
                            {
                                User = foundUser,
                                UserId = foundUser.UserId,
                                Challenge = newChallenge,
                                ChallengeId = newChallenge.ChallengeId
                            };
                        }
                    }
                }
            }
            catch (Exception)
            {
                ChallengeVM vm3 = new ChallengeVM() { Error = "NotFound_User" };
                return 4043;
            }

            // Assign the list to the challenge's items
            newChallenge.Items = newItems;
            newChallenge.UsersChallenges = newUser;
          
            var query = _context.Challenges.Add(newChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
