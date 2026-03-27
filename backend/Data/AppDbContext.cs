using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Expert> Experts => Set<Expert>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<QAQuestion> QAQuestions => Set<QAQuestion>();
    public DbSet<QAAnswer> QAAnswers => Set<QAAnswer>();
    public DbSet<Resource> Resources => Set<Resource>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Indexing based on screen_spec requirements
        modelBuilder.Entity<Post>().HasIndex(p => p.VoteCount);
        modelBuilder.Entity<Post>().HasIndex(p => p.CreatedAt);
    }
}
