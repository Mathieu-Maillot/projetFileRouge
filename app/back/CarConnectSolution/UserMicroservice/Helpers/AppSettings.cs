namespace UserMicroservice.Helpers
{
    public class AppSettings
    {
        public string? SecretKey { get; set; }
        public int? TokenExpirationDays { get; set; }
    }
}
