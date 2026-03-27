using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Resource
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Format { get; set; } = "PDF"; // e.g., "PDF"

    [MaxLength(20)]
    public string FileSize { get; set; } = string.Empty; // e.g., "4.2 MB"

    public string? FileUrl { get; set; }

    public string Category { get; set; } = string.Empty; // e.g., "Tim mạch"

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }
}
