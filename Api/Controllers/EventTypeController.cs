using Application.Models.Request;
using Application.Models.Response;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventTypeController(EventTypeService eventTypeService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<EventTypeResponses>> GetAllEventTypes()
        {
            var data = await eventTypeService.GetAll();
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<EventTypeCreatedResponse>> Create(EventTypeRegisterRequest dto)
        {
            var data = await eventTypeService.Create(dto);
            return Ok(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseEmptyResult>> Update(int id, EventTypeRegisterRequest dto)
        {
            var data = await eventTypeService.Update(id, dto);
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseEmptyResult>> Delete(int id)
        {
            var data = await eventTypeService.Delete(id);
            return Ok(data);
        }
    }
}
