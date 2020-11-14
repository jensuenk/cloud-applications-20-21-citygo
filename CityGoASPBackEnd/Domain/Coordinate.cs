using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Coordinate
    {
        [JsonIgnore]
        public int CoordinateId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        [JsonIgnore]
        public Sight Sight { get; set; }
    }
}
