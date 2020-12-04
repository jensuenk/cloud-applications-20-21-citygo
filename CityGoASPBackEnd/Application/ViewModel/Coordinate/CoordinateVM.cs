using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel.Coordinate
{
    public class CoordinateVM
    {
        public int CoordinateId { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public Domain.Sight Sight { get; set; }

        public int SightId { get; set; }

        [JsonIgnore]
        public string Error { get; set; }
    }
}
