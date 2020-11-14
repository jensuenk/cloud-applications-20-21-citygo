using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.Item
{
    public class SightVM
    {
        public int SightId { get; set; }

        public string Name { get; set; }

        public string Info { get; set; }

        public bool Monument { get; set; }

        public bool Stop { get; set; }

        public List<Domain.Coordinate> Coordinates { get; set; }

        public List<Domain.Challenge> Challenges { get; set; }
    }
}
