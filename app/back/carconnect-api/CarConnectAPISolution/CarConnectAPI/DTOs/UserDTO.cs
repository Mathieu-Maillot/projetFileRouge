using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CarConnectAPI.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Le nom est requis.")]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "Le nom fait au maximum {1} caractères.")]
        [RegularExpression(@"^[A-Z]+$", ErrorMessage = "Le nom doit être en majuscules.")]
        public string LastName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Le prenom est requis.")]
        [StringLength(30, ErrorMessage = "Le prénom fait au maximum {1} caractères.")]
        [RegularExpression(@"^[A-Z][A-Za-z\- ]*$", ErrorMessage = "Le prénom doit commencer par une majuscule.")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le genre est requis.")]
        [StringLength(1, ErrorMessage = "Le genre fait exactement {1} caractères.")]
        [RegularExpression("^[FMN]$", ErrorMessage = "Le genre doit être F, M ou N.")]
        public string Gender { get; set; } = string.Empty;
        [Required(ErrorMessage = "La date de naissance est requise.")]
        [Range(typeof(DateOnly), "1911-01-01", "9999-12-31", ErrorMessage = "La date de naissance doit être après 1910.")]
        //[JsonIgnore] 
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

        [EmailAddress(ErrorMessage = "Le format de l'email est invalide.")]
        public string? Email { get; set; }

        [RegularExpression(@"^\+?[0-9]{10,15}$", ErrorMessage = "Le numéro de téléphone est invalide.")]
        public string? PhoneNumber { get; set; }

    }
}
