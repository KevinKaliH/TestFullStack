using Application.Models.Response;
using Application.Utils;

namespace Api.Middlewares
{
    public class BusinessExceptionMiddleware(RequestDelegate _next)
    {
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var dataResponse = new BaseResponse<object>()
            {
                Success = false,
                Data = null,
                StatusCode = StatusCodeEnum.InternalServerError,
            };

            int statusCode;
            switch (exception)
            {
                case BusinessException bex:
                    statusCode = (int)bex.StatusCode;
                    dataResponse.StatusCode = bex.StatusCode;
                    dataResponse.ErrorMessage = bex.Message;
                    dataResponse.Data = bex.Data;
                    break;

                default:
                    dataResponse.ErrorMessage = "Error en el servidor";
                    statusCode = (int) StatusCodeEnum.InternalServerError;
                    break;
            }

            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(dataResponse);
        }
    }
}
