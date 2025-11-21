using Application.Models.DTOs;

namespace Application.Models.Response
{
    public class EventTypeResponses : BaseResponse<IEnumerable<EventTypeDto>>
    {
    }


    public class EventTypeCreatedResponse : BaseResponse<EventTypeDto> { }
}
