using backend.Helpers;
using backend.Middlewares;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:8080", "https://localhost:8443");

builder.Services.AddProjectServices();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("frontend");
app.UseMiddleware<RequestLoggingMiddleware>();

app.MapControllers();

app.Run();
