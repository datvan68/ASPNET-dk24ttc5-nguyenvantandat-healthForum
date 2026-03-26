using backend.Helpers;
using backend.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProjectServices();
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

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseCors("frontend");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
