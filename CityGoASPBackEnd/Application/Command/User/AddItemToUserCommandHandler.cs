﻿using Application.Interfaces;
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

namespace Application.Command.User
{
    public class AddItemToUserCommandHandler : IRequestHandler<AddItemToUserCommand, int>
    {
        IDBContext _context;
        public AddItemToUserCommandHandler(IDBContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddItemToUserCommand request, CancellationToken cancellationToken)
        {
            Domain.User user;
            Domain.Item item;
            try
            {
                user = await _context.Users.Where(u => u.UserId == request.UserId).SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_User" };
                return 4043;
            }
            try
            {
                item = await _context.Items.Where(i => i.ItemId == request.ItemId).SingleAsync();

            }
            catch (Exception)
            {
                UserVM vm1 = new UserVM() { Error = "NotFound_Item" };
                return 4042;
            }
            UsersItems usersItems = new UsersItems() 
            { 
                User = user, 
                UserId = user.UserId, 
                Item = item,
                ItemId = item.ItemId
            };
            if (user.UsersItems == null)
            {
                List<Domain.UsersItems> tussen = new List<Domain.UsersItems>();
                tussen.Add(usersItems);
                user.UsersItems = tussen;
            }
            else {
                user.UsersItems.Add(usersItems);
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
            var query1 = _context.Users.Update(user);
            var query2 = _context.Items.Update(item);
            var query3 = _context.UsersItems.Add(usersItems);
            return await _context.SaveAsync(cancellationToken);
        }
    }
}
