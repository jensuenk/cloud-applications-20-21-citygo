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
            List<Sight> sightH = new List<Sight>() {
            new Sight{
            Name = "Kathedraal",
            Info= "Grote kerk",
            Monument = true,
            Stop = false,
            Location = "'t Stad"
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
            if (!context.Sights.Any())
            {
                foreach (var sights in sightH)
                {
                    context.Sights.Add(sights);
                }
            }
            context.SaveChanges();
        }
    }
}
