using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityGoASPBackEnd.Model
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserItem> UserItems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<UserItem>()
             .HasKey(gc => new { gc.UserId, gc.ItemId });

            modelbuilder.Entity<UserItem>(b =>
            {
                b.HasOne(c => c._User)
                .WithMany(g => g.UserItems)
                .HasForeignKey(c => c.UserId);
                b.HasOne(c => c._Item)
                .WithMany(g => g.UserItems)
                .HasForeignKey(c => c.ItemId);
            });

           
        }
    }
}
