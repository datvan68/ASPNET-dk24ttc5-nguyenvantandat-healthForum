using backend.Repositories;
using backend.Services;

namespace backend.Helpers;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddProjectServices(this IServiceCollection services)
    {
        services.AddSingleton<ForumRepository>();
        services.AddSingleton<HealthService>();

        return services;
    }
}
