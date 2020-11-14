using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.Coordinate
{
    public class ListCoordinateVM
    {
        public ListCoordinateVM()
        {
            Coordinates = new List<CoordinateVM>();
        }
        public List<CoordinateVM> Coordinates { get; set; }
    }
}
