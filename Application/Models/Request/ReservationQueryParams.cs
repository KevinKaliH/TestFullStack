namespace Application.Models.Request
{
    public class ReservationQueryParams
    {
        public int? ClientId { get; set; }
        public int? EventTypeId { get; set; }
        public string? ReservationCode { get; set; }

        public DateTime? InitialDate { get; set; }
        public DateTime? EndDate { get; set; }

        public bool? OrderByReservationDesc { get; set; } = false;

        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }
}
