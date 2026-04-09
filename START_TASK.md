Read PROJECT_BRIEF.md first.

Build the MVP in Next.js + Tailwind CSS.

Requirements:
- Create a calm, minimal web app UI
- Main screen should feel like a large whiteboard / thinking board
- Show topic cards on the board
- Clicking a topic should reveal more detail
- Include support for subtopics
- Keep the interface simple and spacious
- Do not make it feel like a kanban board or office task manager
- Do not add playful stickers, emojis, or cartoon style elements
- Do not add paid AI features

Please do the following:
1. Initialize the project
2. Create a clean folder structure
3. Build the first UI for:
   - board view
   - topic detail panel or zoom-in view
   - new topic modal
4. Use mock sample data from the brief
5. Add basic local state management
6. Explain how to run the project locally

Preferred stack:
- Next.js
- Tailwind CSS
- TypeScript if convenient

Then give Codex this as your first prompt:

Read PROJECT_BRIEF.md and START_TASK.md first.

Build the project exactly from those files.

Important:
- prioritize UX and visual feeling over advanced functionality
- this should feel like a thinking space, not a task manager
- keep the design minimal and calm
- choose a detail interaction that preserves the whiteboard feeling
- use local mock data only
- after building, explain the structure and how to run it

Then, after it builds the first version, use this second prompt:

Refine the UI.

Goals:
- make the board feel more open and calm
- reduce any “admin / productivity app” feeling
- increase whiteboard / brainstorm feeling
- make cards cleaner and more minimal
- improve spacing and typography
- keep everything simple and modern

Do not add unnecessary features.

Then use this third prompt for the topic depth feature:

Improve the topic interaction.

I want each topic to feel like it has layers.
When I click a topic, I should feel like I am entering that topic and seeing deeper information.

Please refine the UX for:
- subtopics
- notes
- checklist
- optional date
- optional status

Keep it visually calm and not crowded.

Recommended setup options:

Codex IDE extension if you want a visual coding workflow inside your editor. OpenAI documents that the IDE extension can work side by side in your IDE and starts in Agent mode by default.
Codex CLI if you want to work from terminal. OpenAI’s quickstart says to install @openai/codex, run codex, sign in, and ask it to work in the current directory.

If you want the exact terminal setup, OpenAI’s quickstart says the CLI install commands are:

npm install -g @openai/codex
codex

Then sign in with your ChatGPT account and run it in your project folder.

One more thing: OpenAI’s Codex prompting docs say Codex works best when you clearly describe what you want it to do, and the prompting guide recommends explicit task instructions rather than relying on long raw conversation history.

Best practice for your case:

don’t paste the whole chat
use the brief + task files above
then iterate with short refinement prompts

If you want, I can also turn this into a ready-to-copy README.md plus a single “master prompt” for Codex.
