using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Device
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string DeviceName { get; set; }
    public string DeviceVersion { get; set; }
    public DateTime LastUpdate { get; set; }
}
