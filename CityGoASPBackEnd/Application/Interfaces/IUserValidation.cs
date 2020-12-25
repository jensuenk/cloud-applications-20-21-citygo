using Application.ViewModel;
using Application.ViewModel.Challenge;
using Application.ViewModel.Item;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Application.Interfaces
{
    public interface IUserValidation
    {
        public Task<IActionResult> HandleValidation(UserVM user);
        //public Task<IActionResult> HandleValidation(ListUserVM listUser);
        public Task<IActionResult> HandleValidation(int errorCode);
    }
}
