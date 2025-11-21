namespace Application.Models.DTOs
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int EventTypeId { get; set; }
        public DateTime ReservationDate { get; set; }
        public string ReservationCode { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
