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
            
            List<Domain.Item> itemsL = new List<Domain.Item>()
            {
                new Domain.Item()
                {
                    Name = "test",
                    Location = "somewhere",
                    Rarity = "rare",
                    Picture = "nice"
                }
            };
            List<Domain.User> usersL = new List<Domain.User>()
            {
                new Domain.User()
                {
                    Name = "Jhon Doe",
                    Username = "Jh0nD03",
                    Email = "jhon.doe@gmail.com",
                    Balls = 1
                }
            };
            List<Domain.Sight> sightsL = new List<Domain.Sight>()
            {
                new Domain.Sight()
                {
                    Name = "testplek",
                    Info = "testinfo",
                    Monument = true,
                    Stop = false,
                    Polygon1 = "1",
                    Polygon2 = "2",
                    Polygon3 = "3",
                    Polygon4 = "4"
                }
            };
            List<Domain.Challenge> ChallengesL = new List<Domain.Challenge>()
            {
                new Domain.Challenge()
                {
                    Name = "Chal1",
                    Answer = "antwoord",
                    QuestionChallenge = "vraag",
                    Task = "een vraag",
                    TaskDone = false
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
            if (!context.Challenges.Any())
            {
                foreach (var challenge in ChallengesL)
                {
                    context.Challenges.Add(challenge);
                }
            }
            if (!context.Sights.Any())
            {
                foreach (var sight in sightsL)
                {
                    context.Sights.Add(sight);
                }
            }
           
            context.SaveChanges();
        }
    }
}
