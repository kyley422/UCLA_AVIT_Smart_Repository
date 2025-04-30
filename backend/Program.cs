using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Replace with your frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure MongoDB connection
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB") 
    ?? Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING");
var mongoClient = new MongoClient(mongoConnectionString);
var database = mongoClient.GetDatabase("AVHardwareDB");
var devicesCollection = database.GetCollection<AVDevice>("Devices");

var app = builder.Build();
app.MapControllers();
// app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowFrontend");

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
    string? date,
    string? manufacturer, 
    string? model, 
    string? updateFirmwareVersion, 
    string? description, 
    int? devicesAffected, 
    string? size,
    string? severity,
    string? deviceType,
    string? location
);