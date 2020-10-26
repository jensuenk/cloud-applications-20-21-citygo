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
        public DbSet<User> Users { get; set; }
        Task<int> SaveAsync(CancellationToken cancellationToken);
    }
}
