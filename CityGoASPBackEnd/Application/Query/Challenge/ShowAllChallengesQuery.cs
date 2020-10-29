using Application.ViewModel.Challenge;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Query.Challenge
{
    public class ShowAllChallengesQuery : IRequest<ListChallengeVM>
    {
    }
}
