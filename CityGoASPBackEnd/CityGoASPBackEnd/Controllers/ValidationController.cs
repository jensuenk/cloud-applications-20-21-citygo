using Application.Interfaces;
using Application.ViewModel;
using Application.ViewModel.Challenge;
using Application.ViewModel.Item;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CityGoASPBackEnd.Controllers
{
    public class ValidationController: IUserValidation
    {
        public UserVM Result { get; private set; }
        public UserVM HandleValidation(UserVM user)
        {
            Result = user;
            if (user.Error == "NotFound")
            {
                Result.Error = "Invalid id given, try using an exsisting id";
                user.Error = "Invalid id given, try using an exsisting id";
                return user;
            }
            else
            {
                Result.Error = "OK";
                user.Error = "OK";
                return user;
            }
        }

        public string HandleValidation(int errorCode)
        {
            if (errorCode == 4001)
            {
                return "The data in your body does not match with the data from the database";
            }
            else if (errorCode == 4041)
            {
                return "Invalid id given for Challenge, try using an exsisting id";
            }
            else if (errorCode == 4042)
            {
                return "Invalid id given for Item, try using an exsisting id";
            }
            else
            {
                return "Command succesfull";
            }
        }

        public ListUserVM HandleValidation(ListUserVM listUser)
        {
            throw new NotImplementedException();
        }
    }
}
