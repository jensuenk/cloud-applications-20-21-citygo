using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [JsonIgnore]
        public Coordinate Location { get; set; }

        [MaxLength(50)]
        public string Rarity { get; set; }

        public string Picture { get; set; }

        [JsonIgnore]
        public List<UsersItems> UsersItems { get; set; }

        [JsonIgnore]
        public Challenge Challenge { get; set; }
    }
}
