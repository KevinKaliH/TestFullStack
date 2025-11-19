using Domain.Entities;

namespace Application.Models.Response
{
    public class EventTypeResponses : BaseResponse<IEnumerable<EventType>>
    {
    }


    public class EventTypeCreatedResponse: BaseResponse<EventType> { }
}
