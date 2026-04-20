using backend.Data;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Helpers;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddProjectServices(this IServiceCollection services)
    {
        // MySQL Database Context configuration
        services.AddDbContext<AppDbContext>((serviceProvider, options) =>
        {
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var connectionString = configuration.GetConnectionString("DefaultConnection")!;
            options.UseMySQL(connectionString);
        });


        services.AddSingleton<HealthService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}
