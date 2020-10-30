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
        public string Polygon1 { get; set; }
        [Required]
        public string Polygon2 { get; set; }
        [Required]
        public string Polygon3 { get; set; }
        [Required]
        public string Polygon4 { get; set; }

        //public Challenge _Challenge { get; set; }
    }
}
