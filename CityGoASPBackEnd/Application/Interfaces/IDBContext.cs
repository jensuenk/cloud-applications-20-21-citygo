using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IDBContext
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sight> Sights { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        Task<int> SaveAsync(CancellationToken cancellationToken);
    }
}
