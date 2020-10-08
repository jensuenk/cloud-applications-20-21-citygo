using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Policy;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class Item
    {
        [Key]
        public int ItemId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Location { get; set; }

        [Required]
        [MaxLength(50)]
        public string Rarity { get; set; }

        [Required]
        public Url Picture { get; set; }

        [JsonIgnore]
        public ICollection<UserItem> UserItems { get; set; }
    }
}
