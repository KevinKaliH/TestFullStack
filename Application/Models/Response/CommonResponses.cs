using Application.Models.DTOs;

namespace Application.Models.Response
{
    public class ClientListResponse : BaseResponse<IEnumerable<ClientDTO>>
    {
    }

    public class ClientCreatedResponse : BaseResponse<ClientDTO> { }

    public class ReservationDataTableListResponse: BaseResponse<IEnumerable<ReservationDataTableDto>>
    {
        public int TotalCount { get; set; }
    }

    public class ReservationCreatedResponse: BaseResponse<ReservationDto> { }
}
