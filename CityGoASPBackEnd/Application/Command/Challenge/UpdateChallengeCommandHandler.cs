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
    public class UpdateChallengeCommandHandler : IRequestHandler<UpdateChallengeCommand, int>
    {
        IDBContext _context;
        public UpdateChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge newChallenge;
            try
            {
                if (request.ChallengeVM.Name != null && request.ChallengeVM.Task != null && request.ChallengeVM.Answer != null && request.ChallengeVM.QuestionChallenge != null)
                {
                    newChallenge = new Domain.Challenge()
                    {
                        ChallengeId = request.ChallengeVM.ChallengeId,
                        Name = request.ChallengeVM.Name,
                        Task = request.ChallengeVM.Task,
                        Answer = request.ChallengeVM.Answer,
                        QuestionChallenge = request.ChallengeVM.QuestionChallenge,
                        Score = request.ChallengeVM.Score,
                        Balls = request.ChallengeVM.Balls
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

            var oldChallenge = await _context.Challenges.Where(c => c.ChallengeId == newChallenge.ChallengeId)
                .Include(i => i.Items)
                .Include(u=>u.UsersChallenges)
                .SingleAsync();
            oldChallenge.Name = newChallenge.Name;
            oldChallenge.Task = newChallenge.Task;
            oldChallenge.Answer = newChallenge.Answer;
            oldChallenge.Balls = newChallenge.Balls;
            oldChallenge.Score = newChallenge.Score;
            oldChallenge.QuestionChallenge = newChallenge.QuestionChallenge;
            if (request.ChallengeVM.Items != null)
            {
                oldChallenge.Items = newItems;
            }
            if (request.ChallengeVM.UsersChallenges != null)
            {
                oldChallenge.UsersChallenges = newUser;
            }
        
            var query = _context.Challenges.Update(oldChallenge);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
