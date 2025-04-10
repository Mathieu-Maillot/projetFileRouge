using System.ComponentModel.DataAnnotations;
using CarConnectAPI.Helpers;
using CarConnectAPI.Validators;

namespace UserMicroService.DTOs.Users
{
    public class UserRegisterRequestDTO
    {
        [Required(ErrorMessage = "Email is Required.")]
        [EmailAddress(ErrorMessage = "Email is invalid.")]
        public string? Email { get; set; }

        [Required]
        [PasswordValidator]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Firstname is required.")]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "The firstname has a maximum lengh of {1} characters.")]
        [RegularExpression(@"^[A-Z][A-Za-z\- ]*$", ErrorMessage = "The firstname must start with a capital letter.")]
        public string? Firstname { get; set; }

        [Required(ErrorMessage = "Lastname is required.")]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "The lastname has a maximum legnt of {1} characters.")]
        [RegularExpression(@"^[A-Z]+$", ErrorMessage = "The lastname must be capitalez.")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "The gender is required.")]
        [StringLength(1, ErrorMessage = "The gender must be {1} characters.")]
        [RegularExpression("^[FMO]$", ErrorMessage = "The gender must be 'F', 'M' or 'O'.")]
        public char? Gender { get; set; } = ConstantValues.GenreOther;

        [Required(ErrorMessage = "The birthdate is required.")]
        [Range(typeof(DateOnly), "1911-01-01", "9999-12-31", ErrorMessage = "The birthday must be after 1910.")]
        public DateOnly BirthDate { get; set; }

        public int Age
        {
            get
            {
                int age = DateTime.Now.Year - BirthDate.Year;
                if (BirthDate > DateOnly.FromDateTime(DateTime.Now.AddYears(-age))) age--;
                return age;
            }
        }

        [Required]
        [RegularExpression(@"^\+?[0-9]{10,15}$", ErrorMessage = "The phone number is invalid.")]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? Address { get; set; }

        public string? Role { get; set; } = ConstantValues.RoleUser;
    }
}
