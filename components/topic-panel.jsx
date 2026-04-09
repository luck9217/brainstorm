import { useMemo, useState } from "react";

function formatDate(date) {
  if (!date) {
    return "No date";
  }

  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TopicPanel({
  topic,
  topics,
  onClose,
  onUpdateTopic,
  onSelectTopic,
  onToggleChecklist,
  onAddChecklistItem,
  onAddSubtopic,
}) {
  const [checkText, setCheckText] = useState("");
  const [subtopicText, setSubtopicText] = useState("");

  const children = useMemo(
    () => topics.filter((entry) => entry.parentId === topic.id),
    [topic.id, topics],
  );

  const parent = topics.find((entry) => entry.id === topic.parentId);

  function handleChecklistSubmit(event) {
    event.preventDefault();
    const value = checkText.trim();
    if (!value) {
      return;
    }
    onAddChecklistItem(topic.id, value);
    setCheckText("");
  }

  function handleSubtopicSubmit(event) {
    event.preventDefault();
    const value = subtopicText.trim();
    if (!value) {
      return;
    }
    onAddSubtopic(topic.id, value);
    setSubtopicText("");
  }

  return (
    <aside className="paper-panel fixed inset-x-4 bottom-4 top-auto z-30 flex h-[78vh] flex-col rounded-[38px] border border-white/60 shadow-float md:inset-y-6 md:right-6 md:left-auto md:h-auto md:w-[430px]">
      <div className="flex items-start justify-between px-7 pb-3 pt-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sage/60">
            Open thread
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink/48">
            {parent ? (
              <button
                type="button"
                onClick={() => onSelectTopic(parent.id)}
                className="rounded-full bg-white/62 px-3 py-1.5 hover:bg-white/84"
              >
                {parent.title}
              </button>
            ) : (
              <span className="rounded-full bg-white/62 px-3 py-1.5">
                Board root
              </span>
            )}
            <span>Saved in this browser</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/70 px-4 py-2 text-sm text-ink/58 transition hover:bg-white"
        >
          Close
        </button>
      </div>

      <div className="scroll-soft flex-1 space-y-7 overflow-y-auto px-7 pb-7 pt-2">
        <section>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-heading text-5xl leading-[0.94] text-ink">
                {topic.title}
              </p>
              <p className="mt-4 text-sm text-ink/50">
                {formatDate(topic.dueDate)}
              </p>
            </div>

            <select
              value={topic.status || "Active"}
              onChange={(event) =>
                onUpdateTopic(topic.id, { status: event.target.value })
              }
              className="rounded-full border border-transparent bg-white/62 px-4 py-2 text-sm text-ink/60 outline-none focus:border-sage/30"
            >
              <option>Active</option>
              <option>In review</option>
              <option>Needs attention</option>
              <option>Steady</option>
              <option>Gentle hold</option>
              <option>On horizon</option>
            </select>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-sage/62">
            <span>Note</span>
            <input
              type="date"
              value={topic.dueDate || ""}
              onChange={(event) =>
                onUpdateTopic(topic.id, { dueDate: event.target.value })
              }
              className="rounded-full border border-transparent bg-white/62 px-3 py-2 text-[11px] tracking-normal text-ink/55 outline-none focus:border-sage/30"
            />
          </div>

          <textarea
            value={topic.note || ""}
            onChange={(event) =>
              onUpdateTopic(topic.id, { note: event.target.value })
            }
            rows={6}
            spellCheck
            className="w-full resize-none rounded-[28px] border border-white/45 bg-white/52 px-5 py-4 text-[15px] leading-8 text-ink/74 outline-none focus:border-sage/30"
          />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-sage/62">
              Checklist
            </p>
            <p className="text-sm text-ink/40">
              {topic.checklist.length} anchors
            </p>
          </div>

          <div className="space-y-2">
            {topic.checklist.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 rounded-[22px] bg-white/55 px-4 py-3 text-sm text-ink/72"
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => onToggleChecklist(topic.id, item.id)}
                  className="h-4 w-4 rounded border-stone-300 text-sage focus:ring-sage/30"
                />
                <span className={item.done ? "line-through text-ink/40" : ""}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>

          <form onSubmit={handleChecklistSubmit} className="flex gap-2">
            <input
              value={checkText}
              onChange={(event) => setCheckText(event.target.value)}
              placeholder="Add a checkpoint"
              className="min-w-0 flex-1 rounded-full border border-transparent bg-white/58 px-4 py-3 text-sm outline-none placeholder:text-ink/32 focus:border-sage/30"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              Add
            </button>
          </form>
        </section>

        <section className="space-y-3 pb-2">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-sage/62">
              Subtopics
            </p>
            <p className="text-sm text-ink/40">
              {children.length} linked paths
            </p>
          </div>

          <div className="space-y-2">
            {children.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => onSelectTopic(child.id)}
                className="w-full rounded-[26px] bg-white/55 px-5 py-4 text-left transition hover:bg-white/78"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-[1.9rem] leading-none text-ink">
                      {child.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink/56">
                      {child.preview || child.note}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.22em] text-sage/62">
                    open
                  </span>
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubtopicSubmit} className="flex gap-2">
            <input
              value={subtopicText}
              onChange={(event) => setSubtopicText(event.target.value)}
              placeholder="Add a nested thought"
              className="min-w-0 flex-1 rounded-full border border-transparent bg-white/58 px-4 py-3 text-sm outline-none placeholder:text-ink/32 focus:border-sage/30"
            />
            <button
              type="submit"
              className="rounded-full bg-white/88 px-4 py-3 text-sm font-semibold text-ink shadow-soft"
            >
              Nest
            </button>
          </form>
        </section>
      </div>
    </aside>
  );
}
