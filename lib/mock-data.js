export const initialTopics = [
  {
    id: "skilled-visa",
    parentId: null,
    title: "Skilled visa",
    preview: "Bring score, paperwork, and savings into one calm plan.",
    note:
      "The goal is to make the EOI path feel less abstract. Keep the process visible, the costs realistic, and the paperwork grouped in a way that is easy to revisit.",
    dueDate: "2026-06-18",
    status: "Active",
    position: { x: 10, y: 12, angle: -2 },
    checklist: [
      { id: "visa-1", text: "Check updated points score", done: true },
      { id: "visa-2", text: "Draft EOI requirements summary", done: false },
      { id: "visa-3", text: "Set aside the first $7,000", done: false }
    ]
  },
  {
    id: "visa-eoi",
    parentId: "skilled-visa",
    title: "EOI preparation",
    preview: "Collect the exact steps before doing anything expensive.",
    note:
      "Keep this as the practical layer: what needs to be requested, translated, reviewed, and double-checked before submission.",
    dueDate: "2026-05-26",
    status: "In review",
    checklist: [
      { id: "eoi-1", text: "Review document list", done: true },
      { id: "eoi-2", text: "Mark missing records", done: false }
    ]
  },
  {
    id: "father-visit",
    parentId: null,
    title: "Father-in-law visit",
    preview: "Shape the trip around timing, comfort, and easy paperwork.",
    note:
      "This topic is less about tasks and more about seeing the moving parts together: travel timing, the visa window, and where the visit could feel smooth.",
    dueDate: "2026-07-10",
    status: "Gentle hold",
    position: { x: 39, y: 24, angle: 1 },
    checklist: [
      { id: "visit-1", text: "Compare travel month options", done: false },
      { id: "visit-2", text: "Check accommodation ideas", done: false }
    ]
  },
  {
    id: "postgrad-2027",
    parentId: null,
    title: "Postgraduate visa 2027",
    preview: "A longer horizon board for January 2027 preparation.",
    note:
      "Keep this one quiet and long-range. The purpose is to park questions, requirements, and dates so they stop competing with urgent topics.",
    dueDate: "2027-01-08",
    status: "On horizon",
    position: { x: 67, y: 16, angle: -1 },
    checklist: [
      { id: "pg-1", text: "Collect current requirement notes", done: false },
      { id: "pg-2", text: "List likely evidence documents", done: false }
    ]
  },
  {
    id: "dog-issue",
    parentId: null,
    title: "Dog issue",
    preview: "Track symptoms, questions, and follow-up without panic.",
    note:
      "This space should help reduce stress. Keep observations in one place, note what changed, and separate urgent vet follow-up from general worry.",
    dueDate: "2026-04-20",
    status: "Needs attention",
    position: { x: 18, y: 56, angle: 2 },
    checklist: [
      { id: "dog-1", text: "Note symptom pattern after meals", done: true },
      { id: "dog-2", text: "Prepare questions for next vet visit", done: false }
    ]
  },
  {
    id: "dog-followup",
    parentId: "dog-issue",
    title: "Follow-up visit",
    preview: "Make the next appointment concrete and calm.",
    note:
      "Capture what to bring, what changed since the last visit, and which questions actually matter.",
    dueDate: "2026-04-16",
    status: "Active",
    checklist: [
      { id: "dogf-1", text: "Bring symptom notes", done: true },
      { id: "dogf-2", text: "Ask about food sensitivities", done: false }
    ]
  },
  {
    id: "savings-goal",
    parentId: null,
    title: "Savings goal",
    preview: "A softer money view focused on readiness, not pressure.",
    note:
      "Think in buffers and milestones instead of strict budgeting categories. The point is to feel prepared for the next year, not judged by the numbers.",
    dueDate: "2026-09-01",
    status: "Steady",
    position: { x: 58, y: 60, angle: -3 },
    checklist: [
      { id: "save-1", text: "Define travel and visa buffers", done: false },
      { id: "save-2", text: "Mark monthly minimum saving target", done: true }
    ]
  }
];
