using backend.ViewModels;

namespace backend.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginViewModel model);
    Task<bool> RegisterAsync(RegisterViewModel model);
}

public class AuthService : IAuthService
{
    // Mock user list - updated during session
    private static readonly List<UserProfile> _mockUsers = new()
    {
        new UserProfile { Id = "1", Username = "admin", Email = "admin@clinic.com" }
    };

    public async Task<LoginResponse?> LoginAsync(LoginViewModel model)
    {
        // Check both email and username as we used Email as username in login
        var user = _mockUsers.FirstOrDefault(u => 
            (u.Username == model.Username || u.Email == model.Username) && 
            model.Password == "password123");

        if (user != null)
        {
            return new LoginResponse
            {
                AccessToken = "eye.mock.jwt.token",
                RefreshToken = "eye.mock.refresh.token",
                User = user
            };
        }

        return null;
    }

    public async Task<bool> RegisterAsync(RegisterViewModel model)
    {
        if (model.Password != model.ConfirmPassword) return false;
        if (_mockUsers.Any(u => u.Email == model.Email)) return false;

        var newUser = new UserProfile
        {
            Id = Guid.NewGuid().ToString(),
            Username = model.FullName,
            Email = model.Email
        };

        _mockUsers.Add(newUser);
        return true;
    }
}
