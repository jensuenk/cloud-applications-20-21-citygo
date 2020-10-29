using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Sight
    {
        [Key]
        public int SightId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Info { get; set; }

        public bool Monument { get; set; }

        public bool Stop { get; set; }

        [Required]
        public string Location { get; set; }

        //public Challenge _Challenge { get; set; }
    }
}
