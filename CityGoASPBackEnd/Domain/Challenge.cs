using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        public bool TaskDone { get; set; }

        [Required]
        public string QuestionChallenge { get; set; }

        [Required]
        public string Answer { get; set; }

        [JsonIgnore]
        public Sight Sight { get; set; }

        [JsonIgnore]
        public List<Item> Items { get; set; }

    }
}
