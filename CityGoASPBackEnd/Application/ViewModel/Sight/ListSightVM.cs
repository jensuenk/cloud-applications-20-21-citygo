using Application.ViewModel.Item;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.Sight
{
    public class ListSightVM
    {
        public ListSightVM()
        {
            Sights = new List<SightVM>();
        }
        public List<SightVM> Sights { get; set; }
    }
}
