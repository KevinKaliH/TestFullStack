namespace Domain.Entities
{
    public class Reservation: BaseEntity
    {
        public int ClientId { get; set; }
        public int EventTypeId { get; set; }
        public DateTime ReservationDate { get; set; }
        public string ReservationCode { get; set; }
        public string? Notes { get; set; }

        public EventType EventType { get; set; }
        public Client Client { get; set; }
    }
}
