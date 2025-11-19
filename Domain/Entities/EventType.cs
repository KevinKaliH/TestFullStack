namespace Domain.Entities
{
    public class EventType: BaseEntity
    {
        public string Name { get; set; }
        public string? Description { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
