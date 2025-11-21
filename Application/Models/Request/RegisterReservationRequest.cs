
namespace Application.Models.Request
{
    public class RegisterReservationRequest
    {
        public int ClientId { get; set; }
        public int EventTypeId { get; set; }
        public DateTime ReservationDate { get; set; }
        public string? Notes { get; set; }
    }
}
