using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public interface IPostRepository
{
    Task<(List<Post> Items, int Total)> GetLatestAsync(int page, int pageSize);
    Task<(List<Post> Items, int Total)> GetPopularAsync(int page, int pageSize);
}

public sealed class PostRepository : IPostRepository
{
    private readonly AppDbContext _context;

    public PostRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(List<Post> Items, int Total)> GetLatestAsync(int page, int pageSize)
    {
        var query = _context.Posts
            .Include(p => p.Author)
            .Where(p => p.DeletedAt == null);

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    public async Task<(List<Post> Items, int Total)> GetPopularAsync(int page, int pageSize)
    {
        var query = _context.Posts
            .Include(p => p.Author)
            .Where(p => p.DeletedAt == null);

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.VoteCount)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }
}
