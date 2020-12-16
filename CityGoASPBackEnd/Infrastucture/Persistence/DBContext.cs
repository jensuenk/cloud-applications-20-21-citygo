using Application.Interfaces;
using Application.ViewModel;
using Application.ViewModel.Challenge;
using Application.ViewModel.Item;
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
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=CityGoDB", builder =>
            {
                builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            });
            base.OnConfiguring(optionsBuilder);
        }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Sight> Sights { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<UsersItems> UsersItems { get; set; }
        public DbSet<UsersChallenges> UsersChallenges { get; set; }
        public DbSet<Coordinate> Coordinates { get; set; }
        public DbSet<Friends> Friends { get; set; }

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


            modelbuilder.Entity<UsersChallenges>()
                .HasKey(uc => new { uc.UserId, uc.ChallengeId });


            modelbuilder.Entity<UsersChallenges>(b =>
            {
                b.HasOne(c => c.User)
                .WithMany(u => u.UsersChallenges)
                .HasForeignKey(c => c.UserId);
                b.HasOne(u => u.Challenge)
                .WithMany(c => c.UsersChallenges)
                .HasForeignKey(u => u.ChallengeId);
            });

            modelbuilder.Entity<Challenge>()
                .HasMany(c=>c.Items)
                .WithOne(i=>i.Challenge)
                .OnDelete(DeleteBehavior.SetNull);

            modelbuilder.Entity<Sight>()
                .HasMany(s => s.Challenges)
                .WithOne(c => c.Sight)
                .OnDelete(DeleteBehavior.SetNull);

            modelbuilder.Entity<Sight>()
                .HasMany(s => s.Coordinates)
                .WithOne(c => c.Sight)
                .OnDelete(DeleteBehavior.SetNull);

            modelbuilder.Entity<Friends>()
                .HasKey(f=>new{f.UserId, f.FriendId});
                

            modelbuilder.Entity<Friends>(f =>
            {
                f.HasOne(f => f.User)
                .WithMany(u => u.Friends)
                .HasForeignKey(f => f.FriendId)
                .OnDelete(DeleteBehavior.Cascade);
            });

            //modelbuilder.Entity<User>()
            //.HasMany(u => u.Friends)
            //.WithOne(f => f.User)
            //.HasForeignKey(u=>u.FriendId)
            //.OnDelete(DeleteBehavior.Cascade);
        }
    }
}
