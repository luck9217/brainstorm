import { useEffect, useMemo, useRef, useState } from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatDate(date) {
  if (!date) {
    return "No date";
  }

  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) {
    return "No date";
  }

  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
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
  onDeleteTopic,
}) {
  const [checkText, setCheckText] = useState("");
  const [subtopicText, setSubtopicText] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const slideTrackRef = useRef(null);
  const slideStateRef = useRef(null);

  const children = useMemo(
    () => topics.filter((entry) => entry.parentId === topic.id),
    [topic.id, topics],
  );

  const deleteBranchCount = useMemo(() => {
    const ids = new Set([topic.id]);
    const queue = [topic.id];

    while (queue.length) {
      const currentId = queue.shift();

      for (const entry of topics) {
        if (entry.parentId === currentId && !ids.has(entry.id)) {
          ids.add(entry.id);
          queue.push(entry.id);
        }
      }
    }

    return ids.size;
  }, [topic.id, topics]);

  const parent = topics.find((entry) => entry.id === topic.parentId);

  useEffect(() => {
    setIsDeleteConfirmOpen(false);
    setSlideProgress(0);
    slideStateRef.current = null;
  }, [topic.id]);

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

  function handleSlideStart(event) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const trackNode = slideTrackRef.current;
    if (!trackNode) {
      return;
    }

    const trackRect = trackNode.getBoundingClientRect();
    const thumbWidth = 46;
    const maxOffset = Math.max(trackRect.width - thumbWidth, 1);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore environments where pointer capture is unavailable.
    }

    slideStateRef.current = {
      pointerId: event.pointerId,
      pointerStartX: event.clientX,
      startProgress: slideProgress,
      maxOffset,
    };
  }

  function handleSlideMove(event) {
    const slideState = slideStateRef.current;
    if (!slideState || slideState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();

    const deltaX = event.clientX - slideState.pointerStartX;
    const nextProgress = clamp(
      slideState.startProgress + deltaX / slideState.maxOffset,
      0,
      1,
    );

    setSlideProgress(nextProgress);
  }

  function handleSlideEnd(event) {
    const slideState = slideStateRef.current;
    if (!slideState || slideState.pointerId !== event.pointerId) {
      return;
    }

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore environments where pointer capture is unavailable.
    }

    slideStateRef.current = null;

    if (slideProgress >= 0.9) {
      onDeleteTopic(topic.id);
      return;
    }

    setSlideProgress(0);
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

        <section className="space-y-3 border-t border-white/40 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-sage/62">
              Danger zone
            </p>
            <button
              type="button"
              onClick={() => {
                setIsDeleteConfirmOpen((current) => !current);
                setSlideProgress(0);
              }}
              className="rounded-full border border-rose-300/55 bg-rose-50/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700/88 transition hover:bg-rose-50"
            >
              Delete card
            </button>
          </div>

          {isDeleteConfirmOpen ? (
            <div className="rounded-[24px] border border-rose-200/55 bg-rose-50/45 p-4">
              <p className="text-sm leading-6 text-ink/72">
                Slide to remove this card
                {deleteBranchCount > 1
                  ? ` and ${deleteBranchCount - 1} linked subtopic${deleteBranchCount - 1 > 1 ? "s" : ""}`
                  : ""}
                .
              </p>

              <div
                ref={slideTrackRef}
                className="relative mt-4 h-12 overflow-hidden rounded-full border border-rose-200/65 bg-white/75"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-rose-200/65"
                  style={{ width: `${Math.max(slideProgress * 100, 14)}%` }}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-700/74">
                  Slide right to delete
                </div>
                <button
                  type="button"
                  onPointerDown={handleSlideStart}
                  onPointerMove={handleSlideMove}
                  onPointerUp={handleSlideEnd}
                  onPointerCancel={handleSlideEnd}
                  className="absolute top-0 h-12 w-[46px] rounded-full border border-rose-300/70 bg-white text-xl text-rose-700/90 shadow-[0_8px_18px_rgba(161,70,70,0.2)]"
                  style={{
                    left: `calc(${slideProgress * 100}% - ${slideProgress * 46}px)`,
                    touchAction: "none",
                  }}
                  aria-label="Slide right to confirm deleting this card"
                >
                  ▸
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </aside>
  );
}
