using Application.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    public class ClientRepository(ReservationDBContext dBContext) : BaseRepository<Client>(dBContext), IClientRepository
    {
    }
}
