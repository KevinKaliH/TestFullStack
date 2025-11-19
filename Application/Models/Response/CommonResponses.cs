using Application.Models.DTOs;

namespace Application.Models.Response
{
    public class ClientListResponse : BaseResponse<IEnumerable<ClientDTO>>
    {
    }

    public class ClientCreatedResponse : BaseResponse<ClientDTO> { }

    public class ReservationDataTableListResponse: BaseResponse<DataTableResult<ReservationDataTableDto>>
    {
    }

    public class DataTableResult<T>
    {
        public IEnumerable<T> Data { get; set; } = [];
        public int TotalCount { get; set; }
    }

    public class ReservationCreatedResponse: BaseResponse<ReservationDto> { }
}
