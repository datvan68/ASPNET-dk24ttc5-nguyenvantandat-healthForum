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
            // 1. Try Users table first (registered accounts)
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id && u.DeletedAt == null);

            if (user != null)
            {
                return new ExpertProfileViewModel
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Title = user.Title ?? "",
                    Specialty = user.Specialty ?? "",
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    IsVerified = false,
                    Bio = user.Bio,
                    Location = user.Location,
                    HealthScore = 0,
                    ResearchArea = user.ResearchArea,
                    HighestDegree = user.HighestDegree,
                    Organization = user.Organization,
                    Badges = new List<BadgeViewModel>()
                };
            }

            // 2. Fallback to Experts table
            var expert = await _context.Experts
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id && e.DeletedAt == null);

            if (expert != null)
            {
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
                    Badges = new List<BadgeViewModel>()
                };
            }

            return null;
        }

        public async Task<bool> UpdateProfileAsync(int id, ProfileUpdateViewModel model)
        {
            // Try Users table first
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                user.FullName = model.FullName;
                user.Title = model.Title;
                user.Specialty = model.SiteTitle;
                user.Bio = model.Bio;
                user.Location = model.Location;
                user.ResearchArea = model.ResearchArea;
                user.HighestDegree = model.HighestDegree;
                user.Organization = model.Organization;
                user.UpdatedAt = DateTime.UtcNow;

                _context.Users.Update(user);
                return await _context.SaveChangesAsync() > 0;
            }

            // Fallback to Experts table
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
            expert.UpdatedAt = DateTime.UtcNow;

            _context.Experts.Update(expert);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
