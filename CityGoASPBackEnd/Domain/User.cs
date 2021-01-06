using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Username { get; set; }

        [MaxLength(50)]
        public string Email { get; set; }

        public int Balls { get; set; }

        public int Score { get; set; }

        public string PicrtureURL { get; set; }

        [JsonIgnore]
        public List<UsersItems> UsersItems { get; set; }

        [JsonIgnore]
        public List<UsersChallenges> UsersChallenges { get; set; }

        [JsonIgnore]
        public List<Friends> Friends { get; set; }

        [JsonIgnore]
        public Coordinate Location { get; set; }
        public bool Online { get; set; }

    }
}
