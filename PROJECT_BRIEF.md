# Brainstorm Space — Project Brief

## Product vision
A calm visual thinking space for personal life planning.

This is not meant to feel like a normal to-do list or admin tool.
It should feel closer to a whiteboard / brainstorm space.

The experience should help the user:
- unload thoughts quickly
- see everything visually
- click into a topic to go deeper
- gradually turn messy thoughts into clear plans

## Main problem
The user often has multiple life topics in mind at the same time, for example:
- skilled visa / EOI preparation
- savings goals
- family visit planning
- postgraduate visa preparation for January 2027
- dog health issue

Normal task apps feel too rigid and corporate.
Apple Freeform feels better at the start because of the big open board, but it has problems:
- too playful
- not enough structure
- no depth inside a topic
- hard to create subgroups / nested ideas
- no refinement of rough notes

## UX principle
This app should feel like:
- thinking
- brainstorming
- clarity
- personal life planning

It should NOT feel like:
- office admin
- project management
- kanban
- a spreadsheet
- a corporate dashboard

## Core UX idea
Start with a large calm board.

On the board:
- topics appear as simple clean cards or nodes
- the board feels open, spacious, and minimal
- no emojis, no stickers, no cartoon elements

When the user clicks a topic:
- more information appears
- either in a zoom-in view or detail panel
- user can see subtopics
- user can add notes, dates, and checklist items

## Product concept
This is not just a to-do list.
It is a “thinking space with layers”.

The user starts messy, then adds structure later.

## MVP goals
Build a first version with:

1. Main board view
- large board / canvas feeling
- display topic cards
- cards show:
  - title
  - optional due date
  - short preview note

2. Topic detail experience
- when clicking a topic, show deeper information
- support parent -> child structure (subtopics)
- detail should include:
  - title
  - note / description
  - optional due date
  - optional status
  - checklist
  - subtopics

3. New topic creation
- quick add experience
- minimal friction
- user can create a topic without filling too many fields

## Important design direction
- minimal
- clean
- calm
- modern
- soft shadows
- rounded corners
- light background
- lots of spacing
- no heavy colors
- no clutter
- no playful graphics

## Interaction direction
Preferred interaction:
- board first
- click topic
- open deeper level

This can be:
- a right side detail panel
or
- a zoom-in topic view

Choose the approach that best preserves a “whiteboard feeling”.

## AI / grammar
Do not build paid AI features yet.
No paid API integration for MVP.
If needed, rely only on basic browser spellcheck for now.

## Suggested sample data
Use sample topics such as:
- Skilled visa
- Father-in-law visit
- Postgraduate visa 2027
- Dog issue
- Savings goal

Example:
- Skilled visa
  - check score
  - prepare EOI
  - save $7,000
  - review documents

## Technical preferences
- Next.js
- Tailwind CSS
- local mock data first
- simple component structure
- easy to extend later

## What success looks like
The interface should make the user feel:
- calmer
- less overwhelmed
- able to think clearly
- not pressured by rigid task management
