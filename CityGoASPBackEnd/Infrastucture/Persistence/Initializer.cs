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
                    Location = new Domain.Coordinate() {
                        Latitude = 0,
                        Longitude = 0
                    },
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
                    Balls = 1,
                    Score = 0
                },
                new Domain.User()
                {
                   Name = "Jhon Doe2",
                   Username = "Jh0nD032",
                   Email = "jhon.doe2@gmail.com",
                   Balls = 3,
                   Score = 0
                },
                new Domain.User()
                {
                   Name = "Jhon Doe3",
                   Username = "Jh0nD033",
                   Email = "jhon.doe3@gmail.com",
                   Balls = 3,
                   Score = 0
                }
            };
            List<Domain.Challenge> challengesL = new List<Domain.Challenge>()
            {
                new Domain.Challenge()
                {
                    Name = "Chal1",
                    Answer = "antwoord",
                    QuestionChallenge = "vraag",
                    Task = "een vraag",
                    Score = 100
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

                }
            };


            //context.Database.EnsureDeleted();
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
                foreach (var challenge in challengesL)
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
