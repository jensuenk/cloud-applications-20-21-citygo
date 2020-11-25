using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain
{
    public class Sight
    {
        [Key]
        public int SightId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        public string Info { get; set; }

        public bool Monument { get; set; }

        public bool Stop { get; set; }

        [JsonIgnore]
        public List<Coordinate> Coordinates { get; set; }

        [JsonIgnore]
        public List<Challenge> Challenges { get; set; }
    }
}
