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

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
