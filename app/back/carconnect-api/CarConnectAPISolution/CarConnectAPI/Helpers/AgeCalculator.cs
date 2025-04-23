namespace CarConnectAPI.Helpers
{
    public class AgeCalculator
    {
        public static int AgeCalculatorUser(DateOnly birthdate)
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            var age = today.Year - birthdate.Year;

            if (birthdate > today.AddYears(-age))
                age--;

            return age;
        }
    }
}
