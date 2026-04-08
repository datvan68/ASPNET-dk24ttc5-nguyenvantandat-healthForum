using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IProfileService
    {
        Task<ExpertProfileViewModel?> GetProfileByIdAsync(int id);
        Task<bool> UpdateProfileAsync(int id, ProfileUpdateViewModel model);
    }

    public class ProfileService : IProfileService
    {
        private readonly AppDbContext _context;

        public ProfileService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ExpertProfileViewModel?> GetProfileByIdAsync(int id)
        {
            var expert = await _context.Experts
                .Include(e => e.BadgeMappings)
                    .ThenInclude(ebm => ebm.Badge)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (expert == null) return null;

            return new ExpertProfileViewModel
            {
                Id = expert.Id,
                FullName = expert.FullName,
                Title = expert.Title,
                Specialty = expert.Specialty,
                AvatarUrl = expert.AvatarUrl,
                CoverImageUrl = expert.CoverImageUrl,
                IsVerified = expert.IsVerified,
                Bio = expert.Bio,
                Location = expert.Location,
                HealthScore = expert.HealthScore,
                ResearchArea = expert.ResearchArea,
                HighestDegree = expert.HighestDegree,
                Organization = expert.Organization,
                Badges = expert.BadgeMappings.Select(ebm => new BadgeViewModel
                {
                    Id = ebm.BadgeId,
                    Name = ebm.Badge?.Name ?? string.Empty,
                    IconUrl = ebm.Badge?.IconUrl,
                    IsEarned = ebm.IsEarned
                }).ToList()
            };
        }

        public async Task<bool> UpdateProfileAsync(int id, ProfileUpdateViewModel model)
        {
            var expert = await _context.Experts.FindAsync(id);
            if (expert == null) return false;

            expert.FullName = model.FullName;
            expert.Title = model.Title;
            expert.Specialty = model.SiteTitle;
            expert.Bio = model.Bio;
            expert.Location = model.Location;
            expert.ResearchArea = model.ResearchArea;
            expert.HighestDegree = model.HighestDegree;
            expert.Organization = model.Organization;
            expert.UpdatedAt = System.DateTime.UtcNow;

            _context.Experts.Update(expert);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
