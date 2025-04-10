using System.Text;

namespace CarConnectAPI.Helpers
{
    public class RandomStringGenerator
    {
        private readonly string _characteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
        private Random _random;

        public RandomStringGenerator(string characteres, Random random)
        {
            _characteres = characteres;
            _random = random;
        }

        public string StringGenerator(int length)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = _random.Next(_characteres.Length);
                sb.Append(_characteres[index]);
            }

            return sb.ToString();
        }

        public static string StringGenerator(int length, string characteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?")
        {
            Random random = new Random();
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(characteres.Length); 
                sb.Append(characteres[index]); 
            }

            return sb.ToString();
        }
    }
}
        

