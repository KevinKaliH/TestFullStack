using Application.Utils;

namespace Application.Models.Response
{
    public class BaseResponse<T>
    {
        public bool Success { get; set; } = true;
        public T? Data { get; set; }
        public StatusCodeEnum StatusCode { get; set; } = StatusCodeEnum.Success;
        public string? ErrorMessage { get; set; }
    }

    public class BaseEmptyResult
    {
        public bool Success { get; set; } = true;
        public StatusCodeEnum StatusCode { get; set; } = StatusCodeEnum.Success;
    }
}
