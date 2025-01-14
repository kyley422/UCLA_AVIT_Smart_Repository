# Step 1: Build Stage
FROM mcr.microsoft.com/dotnet/nightly/sdk:9.0 AS build
WORKDIR /app

# Copy project files
COPY *.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy the rest of the project files
COPY . ./

# Publish the application
RUN dotnet publish -c Release -o out

# Step 2: Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copy the build output
COPY --from=build /app/out .

# Expose the application port
EXPOSE 5222

# Run the application
ENTRYPOINT ["dotnet", "backend.dll"]
