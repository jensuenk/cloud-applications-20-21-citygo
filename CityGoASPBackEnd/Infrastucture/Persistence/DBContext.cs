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

        public Task<int> SaveAsync(CancellationToken cancellationToken)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
        protected override void OnModelCreating(ModelBuilder modelbuilder) 
        {

            modelbuilder.Entity<User>()
                .HasMany(u => u.Items)
                .WithOne(i => i.User)
                .OnDelete(DeleteBehavior.SetNull);

            modelbuilder.Entity<Challenge>()
                .HasMany(c=>c.Items)
                .WithOne(i=>i.Challenge)
                .OnDelete(DeleteBehavior.SetNull);

            modelbuilder.Entity<Challenge>()
                .HasOne(c => c.Sight)
                .WithOne(s => s.Challenge)
                .HasForeignKey<Sight>(c => c.ForeignChallengeId); 

        }
    }
}
