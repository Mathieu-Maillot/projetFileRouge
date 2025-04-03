using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace UserMicroservice.Validators
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class PasswordValidator : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            string? input = value?.ToString();
            ErrorMessage = string.Empty;

            if (string.IsNullOrWhiteSpace(input))
                ErrorMessage = "Password should not be empty !";
            else
            {
                var hasEnoughChars = new Regex(@".{10,}");
                var hasNumbers = new Regex(@"[0-9]");
                var hasUpperLetters = new Regex(@"[A-Z]");
                var hasLowerLetters = new Regex(@"[a-z]");
                var hasSymbols = new Regex(@"[!@#$^&*()_+=\[{\]};:<>|./?,-]");

                if (!hasEnoughChars.IsMatch(input))
                    ErrorMessage += "Password should not be less than 10 characters.\n";
                if (hasLowerLetters.Matches(input).Count < 2)
                    ErrorMessage += "Password should not contain at least 2 lower case letters.\n";
                if (hasUpperLetters.Matches(input).Count < 2)
                    ErrorMessage += "Password should not contain at least 2 upper case letters.\n";
                if (hasNumbers.Matches(input).Count < 2)
                    ErrorMessage += "Password should not contain at least 2 numeric characters.\n";
                if (hasSymbols.Matches(input).Count < 2)
                    ErrorMessage += "Password should not contain at least 2 special characters.";

                if (ErrorMessage == string.Empty)
                    return true;
            }
            return false;
        }
    }
}
