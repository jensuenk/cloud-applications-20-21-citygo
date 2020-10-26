using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel
{
    public class ListUserVM
    {
        public ListUserVM() 
        {
            Users = new List<UserVM>();
        }
        public List<UserVM> Users { get; set; }
    }
}
