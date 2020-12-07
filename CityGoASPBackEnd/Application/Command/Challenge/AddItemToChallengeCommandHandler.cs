using Application.Interfaces;
using Application.ViewModel;
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
    public class AddItemToChallengeCommandHandler : IRequestHandler<AddItemToChallengeCommand, ChallengeVM>
    {
        IDBContext _context;
        public AddItemToChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<ChallengeVM> Handle(AddItemToChallengeCommand request, CancellationToken cancellationToken)
        {
            Domain.Challenge challenge;
            Domain.Item item = new Domain.Item(); ;
            //Zoeken naar de opgegeven item en challenge
            try
            {
                challenge = await _context.Challenges.Where(u => u.ChallengeId == request.ChallengeId).SingleAsync();
            }
            catch (Exception)
            {
                ChallengeVM vm1 = new ChallengeVM() { Error = "NotFound_Challenge" };
                return vm1;
            }
            try
            {
                item = await _context.Items.Where(i => i.ItemId == request.ItemId).SingleAsync();
            }
            catch (Exception)
            {
                ChallengeVM vm2 = new ChallengeVM() { Error = "NotFound_Item" };
                return vm2;
            }

            //Voeg challenge toe bij item
            item.Challenge = challenge;

         
            //Alles opslaan in de database
            var query1 = _context.Challenges.Update(challenge);
            var query2 = _context.Items.Update(item);



            ChallengeVM vm3 = new ChallengeVM()
            {
                ChallengeId = challenge.ChallengeId,
                QuestionChallenge = challenge.QuestionChallenge,
                Answer = challenge.Answer,
                Items = challenge.Items,
                Name = challenge.Name,
                Sight = challenge.Sight,
                Task = challenge.Task,
                User = challenge.User,
                Error = "OK"
            };
            return vm3;
        }
    }
}
