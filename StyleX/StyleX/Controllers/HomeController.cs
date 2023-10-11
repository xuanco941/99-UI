using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace StyleX.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}