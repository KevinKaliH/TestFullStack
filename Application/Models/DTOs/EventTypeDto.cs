namespace Application.Models.DTOs
{
    public record EventTypeDto(int Id, string Name, String? Description, DateTime CreatedAt, DateTime UpdatedAt, bool IsActive);
}
