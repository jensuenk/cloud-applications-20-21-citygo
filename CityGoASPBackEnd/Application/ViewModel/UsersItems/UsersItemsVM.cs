using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.UsersItems
{
    public class UsersItemsVM
    {
        public int UserId { get; set; }

        public Domain.User User { get; set; }

        public int ItemId { get; set; }

        public Domain.Item Item { get; set; }
    }
}
