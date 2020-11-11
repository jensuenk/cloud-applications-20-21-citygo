using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastucture.Persistence
{
    public class DBContext: DbContext, IDBContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Sight> Sights { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<UsersItems> UsersItems { get; set; }


        public Task<int> SaveAsync(CancellationToken cancellationToken)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
        protected override void OnModelCreating(ModelBuilder modelbuilder) 
        {
            modelbuilder.Entity<UsersItems>()
                .HasKey(ui => new { ui.UserId, ui.ItemId });


            modelbuilder.Entity<UsersItems>(b =>
            {
                b.HasOne(i => i.User)
                .WithMany(u => u.UsersItems)
                .HasForeignKey(i => i.UserId);
                b.HasOne(u => u.Item)
                .WithMany(i => i.UsersItems)
                .HasForeignKey(u => u.ItemId);
            });

            modelbuilder.Entity<Challenge>()
                .HasMany(c=>c.Items)
                .WithOne(i=>i.Challenge)
                .OnDelete(DeleteBehavior.SetNull);

            modelbuilder.Entity<Sight>()
                .HasMany(s => s.Challenge)
                .WithOne(c => c.Sight)
                .OnDelete(DeleteBehavior.SetNull);

        }
    }
}
