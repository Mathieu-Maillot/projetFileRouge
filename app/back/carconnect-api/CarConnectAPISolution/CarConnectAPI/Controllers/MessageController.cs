using CarConnectAPI.DTOs;
using CarConnectAPI.Helpers;
using CarConnectAPI.Models;
using CarConnectAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarConnectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService<Message,string> _messageService;

        public MessageController(IMessageService<Message, string> messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMessages()
        {
            var messages = await _messageService.GetAllMessagesAsync();

            var messageDtos = messages.Select(message => MessageDTO.FromEntity(message, message.SenderId, message.ReceiverId));
            //var messageDtos = messages.Select(message => new MessageDTO
            //{
            //    Id = message.Id,
            //    SenderId = message.SenderId,
            //    ReceiverId = message.ReceiverId,
            //    Content = message.Content,
            //    SendAt = message.SendAt,
            //    CreateAt = message.CreateAt,
            //    UpdateAt = message.UpdateAt,    
            //});

            return Ok(messageDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessageByIdAsync(string id)
        {
            var message = await _messageService.GetMessageByIdAsync(id);
       
            if (message is null) return NotFound();

            var dto = MessageDTO.FromEntity(message , message.SenderId, message.ReceiverId);
            //var dto = new MessageDTO
            //{
            //    Id = message.Id,
            //    SenderId = message.SenderId,
            //    RevecerId= message.ReceiverId,
            //    Content = message.Content,
            //    SendAt = message.SendAt,
            //    CreateAt = message.CreateAt,
            //    UpdateAt= message.UpdateAt
            //};
            return Ok(dto);
        }

        [HttpPost]
        [ActionName(nameof(CreateMessageAsync))]

        public async Task<IActionResult> CreateMessageAsync(string senderId, string receverId, [FromBody] Message message)
        {
            var created = await _messageService.CreateMessageAsync(message);
            created.Id ??= RandomStringGenerator.StringGenerator();
            created.CreateAt = DateTime.UtcNow;
            created.UpdateAt = DateTime.UtcNow;
            var dto = MessageDTO.FromEntity(created, senderId, receverId);
            //var dto = new MessageDTO
            //{
            //    SenderId= created.SenderId,
            //    ReceiverId = created.ReceiverId,
            //    Content = created.Content,
            //    SendAt = created.SendAt,
            //    CreateAt = created.CreateAt,
            //    UpdateAt = created.UpdateAt
            //};
            return Created($"Message/{created.Id}", dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMessageAsync(string id , [FromBody] Message message)
        { 
            message.Id = id;
            var updated = await _messageService.UpdateMessageAsync(id, message);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessageAsync(string id)
        {
            var message = await _messageService.GetMessageByIdAsync(id);
            if(message is null) return NotFound();

            var result = await _messageService.DeleteMessageAsync(message.Id);
            return result ? NoContent() : StatusCode(500, "Error deleting message.");
        }
    }
}
