using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class Sight
    {
        [Key]
        public int QuoteId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Info { get; set; }

        [Required]
        public string Location { get; set; }

        public Challenge _Challenge { get; set; }
    }
}
