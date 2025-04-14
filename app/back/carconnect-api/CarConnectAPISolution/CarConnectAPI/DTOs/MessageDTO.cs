using CarConnectAPI.Models;

namespace CarConnectAPI.DTOs
{
    public class MessageDTO
    {
        public string Id { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string Content { get; set; }
        public DateTime SendAt { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        public static MessageDTO FromEntity(Message message, string senderId, string receiverId)
        {
            message.SenderId ??= senderId;
            message.ReceiverId ??= receiverId;
            return new MessageDTO
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = message.Content,
                SendAt = message.SendAt,
                UpdateAt = message.UpdateAt,
            };
        }
    }
}
