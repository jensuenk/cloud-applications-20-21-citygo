﻿using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Item
{
    public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, int>
    {
        IDBContext _context;
        public CreateItemCommandHandler(IDBContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateItemCommand request, CancellationToken cancellationToken)
        {
            Domain.Item newItem;
            try
            {
                newItem = new Domain.Item()
                {
                    ItemId = request.ItemVM.ItemId,
                    Name = request.ItemVM.Name,
                    Location = request.ItemVM.Location,
                    Picture = request.ItemVM.Picture,
                    Rarity = request.ItemVM.Rarity,
                    UsersItems = request.ItemVM.UsersItems
                };
            }
            catch (Exception)
            {

                return 4001;
            }    
 
            var query = _context.Items.Add(newItem);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
