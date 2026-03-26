# Health Forum Website

Starter monorepo for a health forum platform with:

- `frontend/`: Next.js 15 + Tailwind CSS
- `backend/`: ASP.NET Core API
- `database/`: SQL Server schema, seed scripts, and stored procedures

## Project structure

```text
health-forum-website/
|- agents/
|- frontend/
|- backend/
|- database/
|- docker-compose.yml
|- .env.example
|- README.md
```

## Quick start

### 1. Start SQL Server

```bash
docker compose up -d
```

### 2. Run backend

```bash
cd backend
dotnet restore
dotnet run
```

Backend default URL: `http://localhost:8080`

Health endpoint: `http://localhost:8080/api/health`

### 3. Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:3000`

## Database setup

Run these scripts in order against SQL Server:

1. `database/schema.sql`
2. `database/scripts/seed.sql`
3. `database/stored-procedures/sp_GetForumTopics.sql`

## Notes

- `frontend/.mcp/figma-config.json` is reserved for local Figma MCP settings.
- `backend/Data/AppDbContext.cs` is a placeholder for future EF Core integration.
- Current backend provides a starter health check endpoint at `GET /api/health`.
