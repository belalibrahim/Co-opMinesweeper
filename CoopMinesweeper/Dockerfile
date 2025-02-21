# Use the official .NET 8 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore any dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Build the application
RUN dotnet publish -c Release -o /app/publish

# Use Node.js 10 to build the TypeScript project in wwwroot
FROM node:10 AS node-build
WORKDIR /src

COPY wwwroot/package*.json ./
RUN npm install
COPY wwwroot/ .
RUN npx tsc

# Use the official .NET 8 runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published application from the build stage
COPY --from=build /app/publish .

# Copy the built TypeScript project from the node-build stage
COPY --from=node-build /src/ ./wwwroot

# Define the entry point for the container
ENTRYPOINT ["dotnet", "CoopMinesweeper.dll"]
