using Application.Interfaces;
using Application.ViewModel.Challenge;
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
    public class CreateChallengeCommandHandler : IRequestHandler<CreateChallengeCommand, ChallengeVM>
    {
        IDBContext _context;
        public CreateChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ChallengeVM> Handle(CreateChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge newChallenge;
            try
            {
                newChallenge = new Domain.Challenge()
                {
                    ChallengeId = request.ChallengeVM.ChallengeId,
                    Name = request.ChallengeVM.Name,
                    Task = request.ChallengeVM.Task,
                    Answer = request.ChallengeVM.Answer,
                    QuestionChallenge = request.ChallengeVM.QuestionChallenge
                };
            }
            catch (Exception)
            {
                ChallengeVM vm1 = new ChallengeVM() { Error = "BadRequest_Challenge" };
                return vm1;
            }


            // Link existing Items to a challenge trough the body
            List<Domain.Item> newItems;
            try
            {
                newItems = new List<Domain.Item>();
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
            catch (Exception)
            {
                ChallengeVM vm2 = new ChallengeVM() { Error = "NotFound_Item" };
                return vm2;
            }


            // Link existing User to a challenge trough the body
            Domain.User newUser;
            try
            {
                newUser = new Domain.User();
                var user = request.ChallengeVM.User;
                // Check if Items exists, if so, add it to a list to asign later
                var foundUser = _context.Users.Find(user.UserId);
                if (foundUser != null)
                {
                    newUser = foundUser;
                }
            }
            catch (Exception)
            {
                ChallengeVM vm2 = new ChallengeVM() { Error = "NotFound_User" };
                return vm2;
            }

            // Assign the list to the challenge's items
            newChallenge.Items = newItems;
            newChallenge.User = newUser;
          
            var query = _context.Challenges.Add(newChallenge);
            ChallengeVM vm3 = new ChallengeVM()
            {
                ChallengeId = newChallenge.ChallengeId,
                QuestionChallenge = newChallenge.QuestionChallenge,
                Answer = newChallenge.Answer,
                Items = newChallenge.Items,
                Name = newChallenge.Name,
                Sight = newChallenge.Sight,
                Task = newChallenge.Task,
                User = newChallenge.User,
                Error = "OK"
            };
            return vm3;
        }
    }
}
