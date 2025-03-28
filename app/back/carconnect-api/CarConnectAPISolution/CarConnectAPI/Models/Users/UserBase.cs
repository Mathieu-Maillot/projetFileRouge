using System.ComponentModel.DataAnnotations;
using CarConnectAPI.Validators;

namespace CarConnectAPI.Models.Users
{
    public abstract class UserBase
    {
        public int Id { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [PasswordValidator]
        public string? Password { get; set; }

    }
}
