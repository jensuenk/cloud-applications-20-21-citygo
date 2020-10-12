using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class DBInitializer
    {
        public static void Initialize(Context context)
        {

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            context.SaveChanges();
        }
    }
}
