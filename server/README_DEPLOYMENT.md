# Medsynk Server Deployment

This document provides instructions for deploying the Medsynk server using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Build and start the services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - API Documentation: http://localhost:8000/docs
   - API Base URL: http://localhost:8000

## Services

### PostgreSQL Database
- **Container:** `medsynk_postgres`
- **Port:** 5432
- **Database:** medsynk_db
- **User:** medsynk_user
- **Password:** medsynk_password

### FastAPI Application
- **Container:** `medsynk_api`
- **Port:** 8000
- **Health Check:** Available at http://localhost:8000/docs

## Environment Variables

The application uses environment variables for database configuration. You can customize these by creating a `.env` file in the server directory.

### Available Environment Variables:

- `DB_NAME`: Database name (default: medsynk_db)
- `DB_USER`: Database user (default: medsynk_user)
- `DB_PASSWORD`: Database password (default: medsynk_password)
- `DB_HOST`: Database host (default: postgres - internal Docker network)
- `DB_PORT`: Database port (default: 5432)
- `DB_SCHEMA`: PostgreSQL schema name (default: public)

The app will automatically create the database (if missing) and also create the schema specified by `DB_SCHEMA` when it is not `public`.

### Setting Up Environment Variables:

1. **Copy the example file:**
   ```bash
   cp env.example .env
   ```

2. **Edit the .env file with your desired values:**
   ```bash
   nano .env
   ```

3. **For production, use strong passwords:**
   ```bash
   DB_PASSWORD=your_secure_password_here
   ```

### Default Values:
If no `.env` file is provided, the following defaults will be used:
- Database: medsynk_db
- User: medsynk_user
- Password: medsynk_password
- Schema: public

## Useful Commands

### Start services in background:
```bash
docker-compose up -d --build
```

### View logs:
```bash
docker-compose logs -f
```

### Stop services:
```bash
docker-compose down
```

### Stop services and remove volumes:
```bash
docker-compose down -v
```

### Rebuild and restart:
```bash
docker-compose up --build --force-recreate
```

## Data Persistence

PostgreSQL data is persisted in a Docker volume named `postgres_data`. This ensures your data survives container restarts.

## Health Checks

Both services include health checks:
- PostgreSQL: Checks database connectivity
- FastAPI: Checks API availability via the docs endpoint

## Troubleshooting

1. **Database connection issues:**
   - Ensure the postgres service is healthy before the API starts
   - Check logs: `docker-compose logs postgres`

2. **API not starting:**
   - Check logs: `docker-compose logs api`
   - Ensure all environment variables are set correctly

3. **Port conflicts:**
   - Change ports in docker-compose.yml if 8000 or 5432 are already in use

