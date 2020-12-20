using Application.ViewModel;
using Application.ViewModel.Challenge;
using Application.ViewModel.Item;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;

namespace Application.Interfaces
{
    public interface IUserValidation
    {
        public UserVM HandleValidation(UserVM user);
        public ListUserVM HandleValidation(ListUserVM listUser);
        public string HandleValidation(int errorCode);
    }
}
