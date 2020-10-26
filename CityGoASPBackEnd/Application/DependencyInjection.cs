using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using System.Text;


namespace Application
{
    [ExcludeFromCodeCoverage]
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterApplication(this IServiceCollection services) 
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
