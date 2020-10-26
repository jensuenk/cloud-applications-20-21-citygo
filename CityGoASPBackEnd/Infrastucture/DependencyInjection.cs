using Application.Interfaces;
using Infrastucture.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastucture
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterPersistence(this IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<DBContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IDBContext>(provider => provider.GetService<DBContext>());

            return services;
        }
    }
}
