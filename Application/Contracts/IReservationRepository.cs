using Application.Models.DTOs;
using Application.Models.Request;
using Domain.Entities;

namespace Application.Contracts
{
    public interface IReservationRepository : IBaseRepository<Reservation>
    {
        Task<(int totalQuery, IEnumerable<ReservationDataTableDto> results)> GetAllWithQuery(ReservationQueryParams query);
    }
}
