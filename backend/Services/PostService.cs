using backend.Models;
using backend.Repositories;
using backend.ViewModels;

namespace backend.Services;

public interface IPostService
{
    Task<PaginatedResponse<PostViewModel>> GetPostsAsync(int page, int pageSize, string sort);
}

public sealed class PostService : IPostService
{
    private readonly IPostRepository _repository;

    public PostService(IPostRepository repository)
    {
        _repository = repository;
    }

    public async Task<PaginatedResponse<PostViewModel>> GetPostsAsync(int page, int pageSize, string sort)
    {
        var (items, total) = sort == "popular" 
            ? await _repository.GetPopularAsync(page, pageSize)
            : await _repository.GetLatestAsync(page, pageSize);

        var viewModels = items.Select(p => new PostViewModel(
            p.Id, p.Title, p.Content, p.VoteCount, p.CommentCount, p.IsVerified,
            p.Author?.FullName ?? "Unknown", p.Author?.Title ?? "", p.Author?.Specialty ?? "",
            p.Author?.AvatarUrl, p.CreatedAt
        ));

        var totalPages = (int)Math.Ceiling(total / (double)pageSize);

        return new PaginatedResponse<PostViewModel>(
            viewModels,
            new MetaData(page, pageSize, total, totalPages)
        );
    }
}
