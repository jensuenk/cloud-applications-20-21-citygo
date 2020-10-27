using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel
{
    public class ListItemVM
    {
        public ListItemVM() 
        {
            Items = new List<ItemVM>();
        }
        public List<ItemVM> Items { get; set; }
    }
}
