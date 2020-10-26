using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IDBContext
    {
        public DbSet<User> Users { get; set; }
    }
}
