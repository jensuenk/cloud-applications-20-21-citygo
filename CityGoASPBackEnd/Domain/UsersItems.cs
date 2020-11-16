using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UsersItems
    {
        [JsonIgnore]
        public int UserId { get; set; }
        
        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public int ItemId { get; set; }

        public Item Item { get; set; }
    }
}
