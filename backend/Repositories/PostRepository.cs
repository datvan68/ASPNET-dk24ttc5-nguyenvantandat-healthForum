using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public interface IPostRepository
{
    Task<(List<Post> Items, int Total)> GetLatestAsync(int page, int pageSize, string? category = null);
    Task<(List<Post> Items, int Total)> GetPopularAsync(int page, int pageSize, string? category = null);
}

public sealed class PostRepository : IPostRepository
{
    private readonly AppDbContext _context;

    public PostRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<(List<Post> Items, int Total)> GetLatestAsync(int page, int pageSize, string? category = null)
    {
        var query = _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Category)
            .Where(p => p.DeletedAt == null);

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category != null && p.Category.Label == category);
        }

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    public async Task<(List<Post> Items, int Total)> GetPopularAsync(int page, int pageSize, string? category = null)
    {
        var query = _context.Posts
            .Include(p => p.Author)
            .Include(p => p.Category)
            .Where(p => p.DeletedAt == null);

        if (!string.IsNullOrEmpty(category))
        {
            query = query.Where(p => p.Category != null && p.Category.Label == category);
        }

        var total = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.VoteCount)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }
}
