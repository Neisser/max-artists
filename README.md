# MAX Artists API

A RESTful API for managing artists and their music releases, built with Cloudflare Workers, D1 Database, and Hono.

## Features

- Artist Management
  - Create and manage artists with name, bio, and genre
  - Filter artists by genre
- Release Management
  - Create and manage music releases (albums/singles)
  - Track release status (unreleased, released, trending)
  - Filter releases by artist, genre, or status

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Database**: D1 (SQLite)
- **Framework**: Hono
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or later)
- NPM package manager
- Cloudflare Wrangler CLI

## Installation

1. Clone the repository and then access to it:
```bash
cd max-artists
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:

```bash
npm run db:setup
```

## Development

Start the development server:
```bash
npm run dev
```

The API will be available at `http://127.0.0.1:8787`

## API Endpoints

Please import into postman the file `Max-API.postman_collection` in order to access the following endpoints:

### Artists

#### Create an Artist
```http
POST /artists
Content-Type: application/json

{
  "name": "Jane Doe",
  "bio": "Indie pop sensation",
  "genre": "Indie Pop"
}
```

#### Get Artists
```http
GET /artists?genre=Indie+Pop&name=The+Smiths
```

### Releases

#### Create a Release
```http 
POST /releases
Content-Type: application/json

{
  "title": "Breaking Free",
  "release_date": "2025-04-01",
  "status": "unreleased",
  "genre": "Indie Pop",
  "artist_id": "artist_123"
}
```

#### Get Releases
```http
GET /releases?artist_id=artist_123&genre=Indie+Pop&status=released
```

## Database Schema

### Artists Table
```sql
CREATE TABLE IF NOT EXISTS artists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  genre TEXT NOT NULL
);
```

### Releases Table
```sql
CREATE TABLE IF NOT EXISTS releases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  release_date TEXT NOT NULL,
  status TEXT NOT NULL,
  genre TEXT NOT NULL,
  artist_id TEXT NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artists(id)
);
```

## Project Structure

```
src/
├── adapters/          # Framework adapters (HTTP, routes)
├── core/             # Business logic and domain
├── infrastructure/   # Database and external services
└── common/           # Shared utilities and types
```

## Development Tools

- `npm run dev` - Start development server
- `npm run sql` - Execute SQL commands
- `npm run sql-file` - Execute SQL from a file
- `npm run db:setup` - Execute SQL schema.sql file

## Error Handling

The API uses a consistent error response format:
```json
{
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```
