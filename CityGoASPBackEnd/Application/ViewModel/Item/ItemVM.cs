using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel
{
    public class ItemVM
    {
        public int ItemId { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }

        public string Rarity { get; set; }

        public string Picture { get; set; }

        //public ICollection<UserItem> UserItems { get; set; }
    }
}
