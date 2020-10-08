using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class UserItem
    {
        public int UserId { get; set; }
        public User _User { get; set; }

        public int ItemId { get; set; }
        public Item _Item { get; set; }
    }
}
