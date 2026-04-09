import { useState } from "react";

export default function QuickCapture({ onCreate }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }

    onCreate({ title: cleanTitle, note: note.trim() });
    setTitle("");
    setNote("");
  }

  return (
    <form onSubmit={handleSubmit} className="paper-panel rounded-[34px] border border-white/60 p-5">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sage/65">Quick capture</p>
          <p className="mt-3 max-w-[18ch] font-heading text-[2.6rem] leading-[0.95] text-ink">
            Add a thought while it still feels loose.
          </p>
        </div>

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New topic"
          className="rounded-[24px] border border-transparent bg-white/56 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/32 focus:border-sage/30"
        />

        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Optional note to hold the shape of it"
          rows={3}
          className="resize-none rounded-[24px] border border-transparent bg-white/56 px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink/32 focus:border-sage/30"
        />

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm leading-6 text-ink/46">Only title and a rough note. You can shape it later.</p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            Place
          </button>
        </div>
      </div>
    </form>
  );
}
