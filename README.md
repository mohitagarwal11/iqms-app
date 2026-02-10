# IQMS - Question Manager

A simple React app for tracking coding questions and organizing them by topics. Built using React, Zustand for state management, and localStorage for data persistence.

## Features

- Create and organize topics with sub-topics
- Add coding questions with difficulty levels and links
- Mark questions as complete
- Data persists in browser localStorage

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

- `/src` - React components and main app logic
- `/sheets` - Zustand store for managing sheet data
- `/api` - localStorage API functions
- `/utility` - Helper functions (like ID generation)

## Tech Stack

- React 18
- Vite
- Zustand (state management)
- Tailwind CSS
- localStorage API

## Notes

Still working on some features like moving questions between sub-topics and maybe search functionality later.

Built as an internship assignment.
