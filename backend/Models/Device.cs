using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;


public class Device
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [Required]
    public string? DeviceName { get; set; }

    [Required]
    public string? DeviceVersion { get; set; }

    [Required]
    public DateTime? LastUpdate { get; set; }
}
