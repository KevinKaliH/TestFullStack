using Application.Contracts;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly ReservationDBContext _dBContext;
        public BaseRepository(ReservationDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<bool> Exist(int id) =>
            await _dBContext.Set<T>()
            .Where(x => x.IsActive)
            .AnyAsync(x => x.Id == id);

        public async Task<IEnumerable<T>> GetAll()
            => await _dBContext.Set<T>()
                .Where(x => x.IsActive)
                .ToListAsync();

        public async Task Create(T newObj)
        {
            _dBContext.Set<T>().Add(newObj);
            await _dBContext.SaveChangesAsync();
        }

        public async Task<bool> Delete(int id)
        {
            var item = await _dBContext.Set<T>().FindAsync(id);
            if (item == null)
                return false;

            item.IsActive = false;
            await _dBContext.SaveChangesAsync();
            return true;
        }

        public async Task Update(T obj)
        {
            obj.UpdatedAt = DateTime.UtcNow;
            _dBContext.Set<T>().Update(obj);
            await _dBContext.SaveChangesAsync();
        }

        public Task<T?> GetById(int id)
            => _dBContext.Set<T>()
                .FirstOrDefaultAsync(x => x.Id == id);
    }
}
