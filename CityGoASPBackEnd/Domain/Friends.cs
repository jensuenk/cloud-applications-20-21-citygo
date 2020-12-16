using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Friends
    {
        [Key]
        public int ID { get; set; }

        public int UserId { get; set; }
        public bool AcceptedUser1 { get; set; }
        public User User { get; set; }


        public int FriendId { get; set; }
        public bool AcceptedUser2 { get; set; }
        public User Friend { get; set; }
    }
}
