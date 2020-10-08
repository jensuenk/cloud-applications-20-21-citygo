using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class ChallengeItem
    {
        public int ChallangeId { get; set; }
        public Challenge _Challenge { get; set; }

        public int ItemId { get; set; }
        public Item _Item { get; set; }
    }
}
