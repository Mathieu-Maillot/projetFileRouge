namespace CarConnectAPI.Middlewares
{
    public class GlobalExcetionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExcetionMiddleware> _logger;

        public GlobalExcetionMiddleware(RequestDelegate next, ILogger<GlobalExcetionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled error has occurred");
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("An internal error has occurred");
            }
        }
    }
}
