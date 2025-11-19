using Application.Models.Request;
using Application.Models.Response;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController(ReservationService reservationService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ReservationDataTableListResponse>> GetAll([FromQuery] ReservationQueryParams reservationQueryParams)
        {
            var data = await reservationService.GetAll(reservationQueryParams);
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<ReservationCreatedResponse>> Create(RegisterReservationRequest dto)
        {
            var data = await reservationService.Create(dto);
            return Ok(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseEmptyResult>> Update(int id, RegisterReservationRequest dto)
        {
            var data = await reservationService.Update(id, dto);
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseEmptyResult>> Delete(int id)
        {
            var data = await reservationService.Delete(id);
            return Ok(data);
        }
    }
}
