namespace Domain.Entities
{
    public class Client: BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
