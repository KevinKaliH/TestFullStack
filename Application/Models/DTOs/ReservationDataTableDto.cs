namespace Application.Models.DTOs
{
    public class ReservationDataTableDto
    {
        public int Id { get; set; }
        public int EventTypeId { get; set; }
        public string EventTypeName { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public DateTime ReservationDate { get; set; }
        public string ReservationCode { get; set; }
        public string Notes { get; set; }
    }
}
