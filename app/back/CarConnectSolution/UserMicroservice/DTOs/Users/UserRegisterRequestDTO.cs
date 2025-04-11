using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using UserMicroservice.Models.Enums;
using UserMicroservice.Validators;

namespace UserMicroservice.DTOs.Users
{
    public class UserRegisterRequestDTO
    {
        [Required(ErrorMessage = "Email is Required.")]
        [EmailAddress(ErrorMessage = "Email is invalid.")]
        public string? Email { get; set; }

        [PasswordValidator]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Le prenom est requis")]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Le prenom fait au maximum {1} caractères.")]
        [RegularExpression(@"^[A-Z][A-Za-z\- ]*$", ErrorMessage = "Le prenom doit commencer par une majuscule.")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Le nom est requis")]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Le nom fait au maximum {1} caractères.")]
        [RegularExpression(@"^[A-Z]+$", ErrorMessage = "Le nom doit être en majuscules.")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Le genre est requis.")]
        [StringLength(1, ErrorMessage = "Le genre fait exactement {1} caracteres.")]
        [RegularExpression("^[FMN]$", ErrorMessage = "Le genre doit être F, M ou N.")]
        public string? Gender { get; set; }

        [Required(ErrorMessage = "La date de naissance est requise.")]
        [Range(typeof(DateOnly), "1911-01-01", "9999-12-31", ErrorMessage = "La date de naissance doit être après 1910.")]
        [BsonIgnore]
        public DateOnly BirthDate { get; set; }

        public int Age
        {
            get
            {
                int age = DateTime.Now.Year - BirthDate.Year;
                if (BirthDate > DateOnly.FromDateTime(DateTime.Now.AddYears(-age)))
                    age--;
                return age;
            }
        }

        [Required]
        [RegularExpression(@"^\+?[0-9]{10,15}$", ErrorMessage = "Le numéro de téléphone est invalide.")]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? Address { get; set; }

        public RoleStatus Role { get; set; } = RoleStatus.user;
    }
}
