namespace Application.Utils
{
    public class BusinessException: Exception
    {
        public StatusCodeEnum StatusCode { get; set; }

        public BusinessException(string msg, StatusCodeEnum statusCode) : base(msg)
        {
            StatusCode = statusCode;
        }
    }
}
