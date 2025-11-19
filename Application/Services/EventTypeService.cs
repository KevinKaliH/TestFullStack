using Application.Contracts;
using Application.Models.Request;
using Application.Models.Response;
using Application.Utils;
using Domain.Entities;

namespace Application.Services
{
    public class EventTypeService(IEventTypeRepository eventTypeRepository)
    {
        public async Task<EventTypeResponses> GetAll()
        {
            var data = await eventTypeRepository.GetAll();

            return new EventTypeResponses
            {
                Success = true,
                Data = data
            };
        }

        public async Task<EventTypeCreatedResponse> Create(EventTypeRegisterRequest dto)
        {
            var newItem = new EventType()
            {

                Name = dto.Name,
                Description = dto.Description,
            };
            await eventTypeRepository.Create(newItem);
            return new EventTypeCreatedResponse
            {
                Data = newItem
            };
        }

        public async Task<BaseEmptyResult> Update(int id, EventTypeRegisterRequest dto)
        {
            var eventType = await eventTypeRepository.GetById(id)
                ?? throw new BusinessException("Not found event Type", StatusCodeEnum.NotFound);

            eventType.Name = dto.Name;
            eventType.Description = dto.Description;
            await eventTypeRepository.Update(eventType);

            return new BaseEmptyResult();
        }

        public async Task<BaseEmptyResult> Delete(int id)
        {
            //var eventType = await eventTypeRepository.GetById(id) ?? throw new BusinessException("Not found event type", StatusCodeEnum.NotFound);
            var result = await eventTypeRepository.Delete(id);
            if (!result)
                throw new BusinessException("Not found event type", StatusCodeEnum.NotFound);

            return new BaseEmptyResult();
        }
    }
}
