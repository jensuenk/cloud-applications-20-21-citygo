using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Challenge
{
    public class ShowChallengeWithItemByIdQuery : IRequest<ChallengeVM>
    {
        public int ChallengeId { get; set; }
        public ShowChallengeWithItemByIdQuery(int id)
        {
            this.ChallengeId = id;
        }
    }
}
