# IQMS App

IQMS is a React app to organize coding practice questions by topic and sub-topic, track completion, and monitor progress.

## Features

- Topic and sub-topic management
  - Add, rename, and delete topics
  - Add, rename, and delete sub-topics
- Question management
  - Add a question from a URL (auto-generates question title from link)
  - Edit question name, difficulty, and link
  - Delete questions
  - Mark questions as done/undone
- Progress tracking
  - Sub-topic, topic, and overall completion counters
  - Topic progress bars
- Persistence
  - Sheet data is saved to `localStorage`
  - Theme preference (light/dark) is saved to `localStorage`
- UI
  - Light and dark theme toggle
  - Collapsible topic and sub-topic sections

## Tech Stack

- React 19
- Vite 7
- Zustand (state management)
- Tailwind CSS 4

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  api/            localStorage API layer
  data/           default seed sheet
  store/          Zustand store and app actions
  utils/          parsing, progress, ids, theme classes
  AddTopicForm.jsx
  HeaderBar.jsx
  TopicCard.jsx
  SubTopicCard.jsx
  QuestionRow.jsx
  App.jsx
```

## Data Model (Simplified)

- Sheet
  - `topics[]`
- Topic
  - `id`, `name`, `order`, `subTopics[]`
- SubTopic
  - `id`, `name`, `order`, `questions[]`
- Question
  - `id`, `name`, `difficulty`, `link`, `done` (or legacy `status`), `order`

## Notes

- `defaultSheet` seeds initial data on first app load if no saved data exists.
- Question links are normalized to include `https://` when missing.

Built for the Codolio assignment.
