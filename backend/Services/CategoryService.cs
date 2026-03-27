using backend.Models;
using backend.Repositories;

namespace backend.Services;

public interface ICategoryService
{
    Task<List<Category>> GetKnowledgeClustersAsync();
}

public sealed class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Category>> GetKnowledgeClustersAsync()
    {
        return await _repository.GetAllActiveAsync();
    }
}
