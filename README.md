# Brainstorm Space

Brainstorm Space is a calm visual planning board for personal life topics.
It combines a freeform whiteboard feeling with lightweight structure, so ideas can start messy and become clear over time.

Live website:
https://luck9217.github.io/brainstorm/

## Why this project

Traditional task apps can feel rigid for personal planning.
This app is designed to feel softer and more visual:

- Capture topics quickly.
- Keep multiple life threads visible at once.
- Open any topic to add depth without losing context.

## Features

- Board-style topic cards with draggable positioning.
- Mobile touch dragging support for cards.
- Topic detail panel with:
  - long-form notes
  - due date
  - status
  - checklist items
  - subtopics
- Parent-child topic relationships.
- Quick capture form for fast topic creation.
- Local browser persistence with localStorage.
- Static export support for GitHub Pages deployment.

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 3

## Getting started

1. Install dependencies

   npm install

2. Start development server

   npm run dev

3. Open in browser

   http://localhost:3000

## Scripts

- npm run dev: start local development server.
- npm run build: create production build.
- npm start: run production server.

## Deployment notes

This project is configured for static export and GitHub Pages.

- output is set to export.
- trailingSlash is enabled.
- basePath and assetPrefix are set dynamically in CI using repository name.

Current production URL:
https://luck9217.github.io/brainstorm/

## Project structure

- app: Next.js app router entry and global styles.
- components: board UI, cards, quick capture, and detail panel.
- lib: mock data and shared data utilities.

## Product direction

Brainstorm Space aims to feel:

- calm
- minimal
- personal
- clear

Not corporate or heavy task-management.
