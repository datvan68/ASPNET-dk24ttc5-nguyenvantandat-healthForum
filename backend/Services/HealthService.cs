namespace backend.Services;

public sealed class HealthService
{
    public object GetStatus()
    {
        return new
        {
            service = "health-forum-backend",
            status = "ok",
            timestamp = DateTime.UtcNow
        };
    }
}
