using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class DBInitializer
    {
        public static void Initialize(Context context)
        {
            List<User> userH = new List<User>() { 
            new User{ 
                Name = "Jhon Doe",
                Username = "Jh0n D0e",
                Balls = 5,
                Email = "jhon.doe@gmail.com"
            }
            };

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                foreach (var user in userH)
                {
                    context.Users.Add(user);
                }
            }
            context.SaveChanges();
        }
    }
}
