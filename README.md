# Movie Streaming App

A simple personal movie streaming website built with React, Vite, and Tailwind CSS.

## Features

- Browse trending movies from TMDB
- Watch movies using Videasy player
- Clean and modern UI
- Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. The `.env` file is already configured with the TMDB API key.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API service functions
├── components/   # Reusable React components
├── pages/        # Page components
├── hooks/        # Custom React hooks (if needed)
├── styles/       # CSS and styling files
├── App.jsx       # Main app component with routing
└── main.jsx      # Entry point
```

## Technologies Used

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- TMDB API
- Videasy Player

## API Keys

The TMDB API key is stored in `.env` file as `VITE_TMDB_API_KEY`.

