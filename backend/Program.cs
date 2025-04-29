using MongoDB.Driver;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Configure MongoDB connection
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB") 
    ?? Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");
var mongoClient = new MongoClient(mongoConnectionString);
var database = mongoClient.GetDatabase("AVHardwareDB");
var devicesCollection = database.GetCollection<AVDevice>("Devices");

var app = builder.Build();
app.MapControllers();
app.UseHttpsRedirection();

// If in Development, map OpenAPI
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Endpoint for AV devices
app.MapGet("/devices", async () =>
{
    var devices = await devicesCollection.Find(_ => true).ToListAsync();
    return devices;
}).WithName("GetDevices");

app.Run();

record AVDevice(
    MongoDB.Bson.ObjectId? _id,
    string? Manufacturer, 
    string? Model, 
    string? CurrentFirmwareVersion, 
    string? UpdateFirmwareVersion, 
    string? Severity
);