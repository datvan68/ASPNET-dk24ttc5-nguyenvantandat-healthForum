using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Expert
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Title { get; set; } = string.Empty; // e.g., "Dr.", "ThS."

    [MaxLength(100)]
    public string Specialty { get; set; } = string.Empty; // e.g., "Thận học", "Dược lâm sàng"

    public string? AvatarUrl { get; set; }

    public bool IsVerified { get; set; } = false;
    public bool IsOnline { get; set; } = false;

    [MaxLength(500)]
    public string? Bio { get; set; }

    [MaxLength(100)]
    public string? Location { get; set; }

    public int HealthScore { get; set; } = 0;

    public string? CoverImageUrl { get; set; }

    [MaxLength(200)]
    public string? ResearchArea { get; set; } // e.g., "Sinh học phân tử"

    [MaxLength(100)]
    public string? HighestDegree { get; set; } // e.g., "Tiến sĩ Y học (Ph.D)"

    [MaxLength(200)]
    public string? Organization { get; set; } // e.g., "Bệnh viện Đại học Y Dược"

    public List<ExpertBadgeMapping> BadgeMappings { get; set; } = new();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
