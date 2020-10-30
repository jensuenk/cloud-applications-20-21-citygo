using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastucture.Persistence
{
    public class Initializer
    {
        public static void Initialize(DBContext context) 
        {
            //context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        }
    }
}
