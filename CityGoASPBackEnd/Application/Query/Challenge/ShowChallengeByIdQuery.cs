using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Challenge
{
    public class ShowChallengeByIdQuery : IRequest<ChallengeVM>
    {
        public int ChallengeId { get; set; }
        public ShowChallengeByIdQuery(int id)
        {
            this.ChallengeId = id;
        }
    }
}
