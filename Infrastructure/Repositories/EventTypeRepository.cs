using Application.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    public class EventTypeRepository(ReservationDBContext dBContext) : BaseRepository<EventType>(dBContext), IEventTypeRepository
    {
    }
}
