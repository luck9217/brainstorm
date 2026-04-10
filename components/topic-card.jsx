import { useRef, useState } from "react";

function getChecklistProgress(checklist = []) {
  if (!checklist.length) {
    return "Open";
  }

  const done = checklist.filter((item) => item.done).length;
  return `${done}/${checklist.length}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function TopicCard({
  topic,
  childCount,
  isActive,
  onSelect,
  onMove,
  cardRef,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef(null);
  const holdTimerRef = useRef(null);
  const pendingTouchRef = useRef(null);
  const suppressClickRef = useRef(false);

  function clearHoldTimer() {
    if (!holdTimerRef.current) {
      return;
    }

    window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  }

  function beginDrag(target, pointerId, clientX, clientY) {
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    const boardNode = target.offsetParent;
    if (!boardNode) {
      return;
    }

    const boardRect = boardNode.getBoundingClientRect();
    const cardRect = target.getBoundingClientRect();

    try {
      target.setPointerCapture(pointerId);
    } catch {
      // Ignore environments where pointer capture is unavailable.
    }
    dragStateRef.current = {
      pointerId,
      pointerStartX: clientX,
      pointerStartY: clientY,
      cardStartLeft: cardRect.left - boardRect.left,
      cardStartTop: cardRect.top - boardRect.top,
      boardWidth: boardRect.width,
      boardHeight: boardRect.height,
      cardWidth: cardRect.width,
      cardHeight: cardRect.height,
      moved: false,
    };

    setIsDragging(true);
  }

  function handlePointerDown(event) {
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (event.pointerType === "touch") {
      pendingTouchRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        target: event.currentTarget,
      };

      holdTimerRef.current = window.setTimeout(() => {
        const pending = pendingTouchRef.current;
        if (!pending || pending.pointerId !== event.pointerId) {
          return;
        }

        beginDrag(
          pending.target,
          pending.pointerId,
          pending.startX,
          pending.startY,
        );
        pendingTouchRef.current = null;
      }, 450);

      return;
    }

    beginDrag(
      event.currentTarget,
      event.pointerId,
      event.clientX,
      event.clientY,
    );
  }

  function handlePointerMove(event) {
    const pending = pendingTouchRef.current;
    if (pending && pending.pointerId === event.pointerId) {
      const deltaX = Math.abs(event.clientX - pending.startX);
      const deltaY = Math.abs(event.clientY - pending.startY);
      if (deltaX > 10 || deltaY > 10) {
        clearHoldTimer();
        pendingTouchRef.current = null;
      }
    }

    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();

    const offsetX = event.clientX - dragState.pointerStartX;
    const offsetY = event.clientY - dragState.pointerStartY;
    const maxLeft = Math.max(dragState.boardWidth - dragState.cardWidth, 0);
    const maxTop = Math.max(dragState.boardHeight - dragState.cardHeight, 0);

    const nextLeft = clamp(dragState.cardStartLeft + offsetX, 0, maxLeft);
    const nextTop = clamp(dragState.cardStartTop + offsetY, 0, maxTop);

    onMove(topic.id, {
      ...topic.position,
      x: (nextLeft / dragState.boardWidth) * 100,
      y: (nextTop / dragState.boardHeight) * 100,
    });

    if (!dragState.moved && (Math.abs(offsetX) > 3 || Math.abs(offsetY) > 3)) {
      dragState.moved = true;
    }
  }

  function endPointerInteraction(event) {
    clearHoldTimer();
    pendingTouchRef.current = null;

    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore environments where pointer capture is unavailable.
    }

    if (dragState.moved) {
      suppressClickRef.current = true;
    }

    dragStateRef.current = null;
    setIsDragging(false);
  }

  function handleClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    onSelect(topic.id);
  }

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPointerInteraction}
      onPointerCancel={endPointerInteraction}
      aria-pressed={isActive}
      className={`topic-card card-halo paper-panel absolute z-10 w-[240px] select-none rounded-[28px] border border-white/60 px-5 pb-7 pt-5 text-left transition duration-300 hover:-translate-y-1.5 hover:border-white/85 focus:outline-none focus:ring-2 focus:ring-sage/30 max-md:relative max-md:left-auto max-md:top-auto max-md:w-full ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${
        isActive
          ? "z-20 -translate-y-1.5 border-sage/45 bg-white/92 shadow-[0_22px_48px_rgba(72,67,57,0.12)]"
          : ""
      }`}
      style={{
        left: `${topic.position?.x ?? 0}%`,
        top: `${topic.position?.y ?? 0}%`,
        rotate: `${topic.position?.angle ?? 0}deg`,
        touchAction: "manipulation",
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
