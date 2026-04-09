function getChecklistProgress(checklist = []) {
  if (!checklist.length) {
    return "Open";
  }

  const done = checklist.filter((item) => item.done).length;
  return `${done}/${checklist.length}`;
}

export default function TopicCard({
  topic,
  childCount,
  isActive,
  onSelect,
  cardRef,
}) {
  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(topic.id)}
      aria-pressed={isActive}
      className={`topic-card card-halo paper-panel absolute z-10 w-[240px] rounded-[28px] border border-white/60 px-5 pb-7 pt-5 text-left transition duration-300 hover:-translate-y-1.5 hover:border-white/85 focus:outline-none focus:ring-2 focus:ring-sage/30 max-md:relative max-md:left-auto max-md:top-auto max-md:w-full ${
        isActive
          ? "z-20 -translate-y-1.5 border-sage/45 bg-white/92 shadow-[0_22px_48px_rgba(72,67,57,0.12)]"
          : ""
      }`}
      style={{
        left: `${topic.position?.x ?? 0}%`,
        top: `${topic.position?.y ?? 0}%`,
        rotate: `${topic.position?.angle ?? 0}deg`,
      }}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="font-heading text-[2rem] leading-[0.95] text-ink">
            {topic.title}
          </p>
          {topic.dueDate ? (
            <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-sage/68">
              {new Date(topic.dueDate).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
              })}
            </p>
          ) : null}
        </div>
        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sage/30" />
      </div>

      <p className="max-w-[18ch] pr-6 text-[14px] leading-6 text-ink/58">
        {topic.preview || topic.note}
      </p>

      <div className="mt-7 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/40">
        <span>{topic.status || "Active"}</span>
        <span className="h-1 w-1 rounded-full bg-ink/20" />
        <span>{getChecklistProgress(topic.checklist)}</span>
        {childCount ? (
          <>
            <span className="h-1 w-1 rounded-full bg-ink/20" />
            <span>
              {childCount} branch{childCount > 1 ? "es" : ""}
            </span>
          </>
        ) : null}
      </div>
    </button>
  );
}
