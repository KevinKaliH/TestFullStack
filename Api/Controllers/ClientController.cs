using Application.Models.Request;
using Application.Models.Response;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController(ClientService clientService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<ClientListResponse>> GetAll()
        {
            var data = await clientService.GetAll();
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<ClientCreatedResponse>> Create(ClientRegisterRequest dto)
        {
            var data = await clientService.Create(dto);
            return Ok(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseEmptyResult>> Update(int id, ClientRegisterRequest dto)
        {
            var data = await clientService.Update(id, dto);
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseEmptyResult>> Delete(int id)
        {
            var data = await clientService.Delete(id);
            return Ok(data);
        }
    }
}
