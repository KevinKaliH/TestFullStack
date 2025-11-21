using Application.Contracts;
using Application.Models.DTOs;
using Application.Models.Request;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ReservationRepository(ReservationDBContext dBContext) : BaseRepository<Reservation>(dBContext), IReservationRepository
    {
        public async Task<(int totalQuery, IEnumerable<ReservationDataTableDto> results)> GetAllWithQuery(ReservationQueryParams query)
        {
            var q = _dBContext.Reservations
                .Include(r => r.Client)
                .Include(r => r.EventType)
                .Where(
                    r => r.IsActive &&
                    r.Client.IsActive &&
                    r.EventType.IsActive
                )
                .AsQueryable();

            if (query.ClientId is > 0)
                q = q.Where(r => r.ClientId == query.ClientId);

            if (query.EventTypeId is > 0)
                q = q.Where(r => r.EventTypeId == query.EventTypeId);

            if (!string.IsNullOrEmpty(query.ReservationCode))
                q = q.Where(r => r.ReservationCode.Contains(query.ReservationCode));

            if (query.InitialDate.HasValue)
                q = q.Where(r => r.ReservationDate > query.InitialDate.Value);

            if (query.EndDate.HasValue)
                q = q.Where(r => r.ReservationDate < query.EndDate.Value);

            if (query.OrderByReservationDesc == true)
                q = q.OrderBy(r => r.ReservationDate);
            else
                q = q.OrderByDescending(r => r.Id);

            var total = await q.CountAsync();

            var skipRows = (query.PageNumber - 1) * query.PageSize;
            var reservations = await q
                .Skip(skipRows)
                .Take(query.PageSize)
                .Select(r => toReservationDataTableDto(r))
                .ToListAsync();

            return (total, reservations);
        }

        private static ReservationDataTableDto toReservationDataTableDto(Reservation reservation)
        {
            return new ReservationDataTableDto
            {
                Id = reservation.Id,
                ClientId = reservation.ClientId,
                EventTypeId = reservation.EventTypeId,
                EventTypeName = reservation.EventType?.Name ?? string.Empty,
                ClientName = reservation.Client?.Name ?? string.Empty,
                ReservationDate = reservation.ReservationDate,
                ReservationCode = reservation.ReservationCode,
                Notes = reservation.Notes ?? string.Empty
            };
        }
    }
}
