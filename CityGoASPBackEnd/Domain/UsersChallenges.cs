using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UsersChallenges
    {
        [JsonIgnore]
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public int ChallengeId { get; set; }

        public Challenge Challenge { get; set; }
    }
}
