using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel
{
    public class UserVM
    {
       
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public int Balls { get; set; }

        public int Score { get; set; }

        public int[] FriendIds {get; set; }

        public List<Domain.Item> Items { get; set; }

        public List<Domain.UsersItems> UsersItems { get; set; }

        public List<Domain.UsersChallenges> UsersChallenges { get; set; }

        public List<Domain.Friends> Friends { get; set; }

        [JsonIgnore]
        public string Error { get; set; }
    }
}
