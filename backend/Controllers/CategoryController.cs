using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("v1/categories")]
public sealed class CategoryController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoryController(ICategoryService service)
    {
        _service = service;
    }

    [HttpGet("clusters")]
    public async Task<IActionResult> GetKnowledgeClusters()
    {
        var clusters = await _service.GetKnowledgeClustersAsync();
        return Ok(new { data = clusters });
    }
}
