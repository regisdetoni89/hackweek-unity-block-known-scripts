# Block Scripts API

Nest.js backend application for the Block Scripts project.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the environment variables:

   Create a `.env` file by copying the `.env.example` contents

3. Run the development server:

   ```bash
   npm run start:dev
   ```

## API Documentation

### Endpoints

- `GET /api/scripts/:hash/:steamId` - Check script status
- `POST /api/scripts` - Submit new script for investigation
- `GET /api/unverified-scripts/next` - Get next unverified script
- `PATCH /api/scripts/:id` - Verify script status
