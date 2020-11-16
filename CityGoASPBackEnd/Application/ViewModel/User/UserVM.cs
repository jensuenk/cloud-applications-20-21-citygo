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

        [JsonIgnore]
        public int ItemsId { get; set; }

        [JsonIgnore]
        public int ChallengeId { get; set; }

        public List<Domain.UsersItems> UsersItems { get; set; }

        public List<Domain.Challenge> Challenges { get; set; }
    }
}
