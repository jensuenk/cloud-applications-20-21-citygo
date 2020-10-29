using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Challenge
    {
        [Key]
        public int ChallengeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Task { get; set; }

        //[Required]
        //[JsonIgnore]
        //public ICollection<Sight> _Sight { get; set; }
    
    }
}
