using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.Challenge
{
    public class ChallengeVM
    {
        public int ChallengeId { get; set; }

        public string Name { get; set; }

        public string Task { get; set; }

        public string QuestionChallenge { get; set; }

        public string Answer { get; set; }

        public int Score { get; set; }

        public Domain.Sight Sight { get; set; }

        public Domain.User User { get; set; }

        public List<Domain.Item> Items { get; set; }

        [JsonIgnore]
        public string Error { get; set; }
    }
}
