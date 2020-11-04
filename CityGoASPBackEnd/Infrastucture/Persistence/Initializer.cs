using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastucture.Persistence
{
    public class Initializer
    {
        public static void Initialize(DBContext context) 
        {
            List<Domain.User> usersL = new List<Domain.User>() 
            { 
                new Domain.User()
                {
                    Name = "Jhon Doe",
                    Username = "Jh0nD03",
                    Email = "jhon.doe@gmail.com",
                    Balls = 1,
                    Items = null
                }
            };
            List<Domain.Item> itemsL = new List<Domain.Item>()
            {
                new Domain.Item()
                {
                    Name = "test",
                    Location = "somewhere",
                    Rarity = "rare",
                    Picture = "nice",
                    User = null
                }
            };
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            
            if (!context.Users.Any())
            {
                foreach (var user in usersL)
                {
                    context.Users.Add(user);
                }
            }
            if (!context.Items.Any())
            {
                foreach (var item in itemsL)
                {
                    context.Items.Add(item);
                }
            }
            context.SaveChanges();
        }
    }
}
