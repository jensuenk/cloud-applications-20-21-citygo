using Application.ViewModel.Challenge;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IChallengeValidation
    {
        public Task<IActionResult> HandleValidation(ChallengeVM challenge);
        public Task<IActionResult> HandleValidation(ListChallengeVM listChallenge);
        public Task<IActionResult> HandleValidation(int errorCode);
    }
}
