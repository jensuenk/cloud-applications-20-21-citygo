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

        [JsonIgnore]
        public List<UsersItems> UsersItems { get; set; }

        [JsonIgnore]
        public List<Challenge> Challenges { get; set; }

        [JsonIgnore]
        public List<UsersFriends> UsersFriends { get; set; }

    }
}
