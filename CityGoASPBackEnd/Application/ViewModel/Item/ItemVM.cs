using Domain;
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

        public List<Domain.UsersItems> UsersItems { get; set; }

        public Domain.Challenge Challenge { get; set; }
    }
}
