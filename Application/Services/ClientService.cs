using Application.Contracts;
using Application.Models.DTOs;
using Application.Models.Request;
using Application.Models.Response;
using Application.Utils;
using Domain.Entities;

namespace Application.Services
{
    public class ClientService(IClientRepository clientRepository)
    {
        public async Task<ClientListResponse> GetAll()
        {
            var data = await clientRepository.GetAll();
            var clients = data.Select(i => ToDto(i));

            return new ClientListResponse
            {
                Success = true,
                Data = clients
            };
        }

        public async Task<ClientCreatedResponse> Create(ClientRegisterRequest dto)
        {
            var newItem = new Client()
            {
                Name = dto.Name,
                Phone = dto.Phone,
                Email = dto.Email,
            };
            await clientRepository.Create(newItem);
            var clientDto = ToDto(newItem);

            return new ClientCreatedResponse
            {
                Data = clientDto,
            };
        }

        public async Task<BaseEmptyResult> Update(int id, ClientRegisterRequest dto)
        {
            var client = await clientRepository.GetById(id)
                ?? throw new BusinessException("Not found client id", StatusCodeEnum.NotFound);

            UpdateEntity(client, dto);
            await clientRepository.Update(client);

            return new BaseEmptyResult();
        }

        public async Task<BaseEmptyResult> Delete(int id)
        {
            var result = await clientRepository.Delete(id);
            if (!result)
                throw new BusinessException("Not found client id", StatusCodeEnum.NotFound);

            return new BaseEmptyResult();
        }

        private ClientDTO ToDto(Client entity)
        {
            return new ClientDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Phone = entity.Phone,
                Email = entity.Email,
                CreatedAt = entity.CreatedAt,
                UpdatedAt = entity.UpdatedAt,
                IsActive = entity.IsActive
            };
        }

        private void UpdateEntity(Client entity, ClientRegisterRequest dto)
        {
            entity.Name = dto.Name;
            entity.Phone = dto.Phone;
            entity.Email = dto.Email;
            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
