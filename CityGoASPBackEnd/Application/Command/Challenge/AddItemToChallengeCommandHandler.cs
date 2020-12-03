using Application.Interfaces;
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
    public class AddItemToChallengeCommandHandler : IRequestHandler<AddItemToChallengeCommand, int>
    {
        IDBContext _context;
        public AddItemToChallengeCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddItemToChallengeCommand request, CancellationToken cancellationToken)
        {
            //Zoeken naar de opgegeven item en challenge
            var challenge = await _context.Challenges.Where(u => u.ChallengeId == request.ChallengeId).SingleAsync();
            var item = await _context.Items.Where(i => i.ItemId == request.ItemId).SingleAsync();

            //Voeg challenge toe bij item
            item.Challenge = challenge;

            //Alles opslaan in de database
            var query1 = _context.Challenges.Update(challenge);
            var query2 = _context.Items.Update(item);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
