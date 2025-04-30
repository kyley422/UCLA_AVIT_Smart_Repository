using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Backend.Services; // Add this to import MongoDBContext

[Route("api/[controller]")]
[ApiController]
public class DeviceController : ControllerBase
{
    private readonly IMongoCollection<Device> _devices;

    public DeviceController()
{
    var connectionString = Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING") 
        ?? "mongodb://localhost:27017"; // Default fallback for local development
    var context = new MongoDBContext(connectionString, "AVHardwareDB");
    _devices = context.GetCollection<Device>("Devices");
}

    [HttpGet]
    public async Task<IActionResult> GetDevices()
    {
        var devices = await _devices.Find(device => true).ToListAsync();
        return Ok(devices);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDevice(Device device)
    {
        await _devices.InsertOneAsync(device);
        return CreatedAtAction(nameof(GetDevices), new { id = device.Id }, device);
    }
}
