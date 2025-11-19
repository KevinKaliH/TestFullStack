namespace Application.Contracts
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T?> GetById(int id);
        Task Create(T newObj);
        Task<bool> Delete(int id);
        Task Update(T obj);
        Task<bool> Exist(int id);
    }
}
