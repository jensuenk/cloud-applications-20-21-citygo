using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.Challenge
{
    public class ListChallengeVM
    {
        public ListChallengeVM()
        {
            Challenges = new List<ChallengeVM>();
        }
        public List<ChallengeVM> Challenges { get; set; }
    }
}
