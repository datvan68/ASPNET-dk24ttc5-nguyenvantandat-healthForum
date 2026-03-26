using backend.Models;

namespace backend.Repositories;

public sealed class ForumRepository
{
    public IReadOnlyList<ForumCategory> GetSeedCategories()
    {
        return
        [
            new ForumCategory
            {
                Id = 1,
                Name = "General Health",
                Description = "General health discussions and community support."
            },
            new ForumCategory
            {
                Id = 2,
                Name = "Nutrition",
                Description = "Food, habits, and healthy lifestyle threads."
            }
        ];
    }
}
