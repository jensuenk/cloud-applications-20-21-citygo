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
        public bool TaskDone { get; set; }

        public string QuestionChallenge { get; set; }

        public string Answer { get; set; }

        public List<Domain.Sight> Sight { get; set; }

        public Domain.Item Item { get; set; }
    }
}
