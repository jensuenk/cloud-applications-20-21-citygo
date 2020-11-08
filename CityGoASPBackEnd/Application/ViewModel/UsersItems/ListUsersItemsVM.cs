using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.UsersItems
{
    public class ListUsersItemsVM
    {
        public ListUsersItemsVM()
        {
            UsersItems = new List<UsersItemsVM>();
        }
        public List<UsersItemsVM> UsersItems { get; set; }
    }
}
