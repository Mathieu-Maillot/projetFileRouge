namespace CarConnectAPI.DTOs
{
    public class MessageDTO
    {
        public string Id { get; set; }
        public string SenderId { get; set; }
        public string RevecerId { get; set; }
        public string Content { get; set; }
        public DateTime SendAt { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
