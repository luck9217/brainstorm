"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QuickCapture from "@/components/quick-capture";
import TopicCard from "@/components/topic-card";
import TopicPanel from "@/components/topic-panel";

const TOPICS_STORAGE_KEY = "brainstorm-space-topics-v1";

const ROOT_POSITIONS = [
  { x: 11, y: 16, angle: -2 },
  { x: 38, y: 25, angle: 1 },
  { x: 66, y: 18, angle: -1 },
  { x: 17, y: 57, angle: 2 },
  { x: 57, y: 60, angle: -3 },
  { x: 75, y: 46, angle: 2 },
];

function createId(prefix = "topic") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function ConnectionLine({ line }) {
  if (!line) {
    return null;
  }

  const width = Math.max(line.endX, line.startX) + 40;
  const height = Math.max(line.endY, line.startY) + 40;
  const path = `M ${line.startX} ${line.startY} C ${line.startX + 160} ${line.startY - 20}, ${line.endX - 140} ${line.endY + 20}, ${line.endX} ${line.endY}`;

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-20 hidden md:block"
      width={width}
      height={height}
    >
      <path
        d={path}
        fill="none"
        stroke="rgba(131, 145, 132, 0.28)"
        strokeDasharray="6 12"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle
        cx={line.startX}
        cy={line.startY}
        r="4"
        fill="rgba(131, 145, 132, 0.52)"
      />
      <circle
        cx={line.endX}
        cy={line.endY}
        r="3.5"
        fill="rgba(131, 145, 132, 0.36)"
      />
    </svg>
  );
}

export default function BoardShell({ initialTopics }) {
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [line, setLine] = useState(null);

  const cardRefs = useRef({});
  const panelAnchorRef = useRef(null);

  const rootTopics = useMemo(
    () => topics.filter((topic) => topic.parentId === null),
    [topics],
  );
  const selectedTopic =
    topics.find((topic) => topic.id === selectedTopicId) ?? null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const savedTopics = window.localStorage.getItem(TOPICS_STORAGE_KEY);
      if (!savedTopics) {
        return;
      }

      const parsed = JSON.parse(savedTopics);
      if (Array.isArray(parsed)) {
        setTopics(parsed);
      }
    } catch {
      // Ignore invalid local storage payloads.
    }
  }, [initialTopics]);

  useEffect(() => {
    function measureLine() {
      if (
        !selectedTopicId ||
        typeof window === "undefined" ||
        window.innerWidth < 768
      ) {
        setLine(null);
        return;
      }

      const cardNode = cardRefs.current[selectedTopicId];
      const panelNode = panelAnchorRef.current;

      if (!cardNode || !panelNode) {
        setLine(null);
        return;
      }

      const cardRect = cardNode.getBoundingClientRect();
      const panelRect = panelNode.getBoundingClientRect();

      setLine({
        startX: cardRect.right - 26,
        startY: cardRect.top + cardRect.height / 2,
        endX: panelRect.left + 16,
        endY: panelRect.top + 90,
      });
    }

    measureLine();
    window.addEventListener("resize", measureLine);
    window.addEventListener("scroll", measureLine, { passive: true });

    return () => {
      window.removeEventListener("resize", measureLine);
      window.removeEventListener("scroll", measureLine);
    };
  }, [selectedTopicId, topics]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(topics));
  }, [topics]);

  function updateTopic(id, patch) {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === id ? { ...topic, ...patch } : topic,
      ),
    );
  }

  function handleMoveTopic(id, position) {
    setTopics((current) =>
      current.map((topic) =>
        topic.id === id ? { ...topic, position } : topic,
      ),
    );
  }

  function handleSelectTopic(id) {
    setSelectedTopicId(id);
  }

  function handleCreateTopic({ title, note }) {
    const position =
      ROOT_POSITIONS[
        topics.filter((topic) => topic.parentId === null).length %
          ROOT_POSITIONS.length
      ];
    const newTopic = {
      id: createId(),
      parentId: null,
      title,
      preview: note || "A fresh space to start shaping this thought.",
      note:
        note ||
        "Capture the rough idea first, then refine it when the shape becomes clearer.",
      dueDate: "",
      status: "Active",
      position,
      checklist: [],
    };

    setTopics((current) => [...current, newTopic]);
    setSelectedTopicId(newTopic.id);
  }

  function handleToggleChecklist(topicId, itemId) {
    setTopics((current) =>
      current.map((topic) => {
        if (topic.id !== topicId) {
          return topic;
        }

        return {
          ...topic,
          checklist: topic.checklist.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item,
          ),
        };
      }),
    );
  }

  function handleAddChecklistItem(topicId, text) {
    setTopics((current) =>
      current.map((topic) => {
        if (topic.id !== topicId) {
          return topic;
        }

        return {
          ...topic,
          checklist: [
            ...topic.checklist,
            { id: createId("check"), text, done: false },
          ],
        };
      }),
    );
  }

  function handleAddSubtopic(topicId, title) {
    const newSubtopic = {
      id: createId("subtopic"),
      parentId: topicId,
      title,
      preview: "A nested branch for this line of thought.",
      note: "Start small here. Add the supporting notes, dates, and checkpoints only when they become useful.",
      dueDate: "",
      status: "Active",
      checklist: [],
    };

    setTopics((current) => [...current, newSubtopic]);
    setSelectedTopicId(newSubtopic.id);
  }

  return (
    <main className="board-surface min-h-screen overflow-hidden text-ink">
      <ConnectionLine line={line} />

      <div className="relative isolate mx-auto flex min-h-screen max-w-[1540px] flex-col px-4 py-5 md:px-7 md:py-7">
        <section className="grid gap-4 md:grid-cols-[minmax(0,1fr)_350px] md:items-start">
          <div className="px-2 py-3 md:px-4 md:py-4">
            <p className="text-xs uppercase tracking-[0.34em] text-sage/60">
              Brainstorm space
            </p>
            <h1 className="mt-4 max-w-[10ch] font-heading text-[4.5rem] leading-[0.9] text-ink md:text-[6.6rem]">
              Let the board hold the noise for a while.
            </h1>
            <p className="mt-5 max-w-[34rem] text-[15px] leading-8 text-ink/52">
              Keep topics visible, follow one thread at a time, and allow
              structure to appear only where it helps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-ink/34">
              <span>{rootTopics.length} topics</span>
              <span className="h-1 w-1 rounded-full bg-ink/16" />
              <span>
                {topics.filter((topic) => topic.parentId).length} branches
              </span>
              <span className="h-1 w-1 rounded-full bg-ink/16" />
              <span>
                {
                  topics
                    .flatMap((topic) => topic.checklist)
                    .filter((item) => item.done).length
                }{" "}
                settled steps
              </span>
            </div>
          </div>

          <QuickCapture onCreate={handleCreateTopic} />
        </section>

        <section className="relative mt-6 flex-1 overflow-hidden rounded-[42px] border border-white/45 bg-white/16 p-4 md:p-6">
          <div className="board-fade pointer-events-none absolute inset-0 rounded-[40px]" />
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-grain opacity-75" />
          <div className="relative z-10 flex min-h-[920px] flex-col gap-5 md:block md:min-h-[820px]">
            <div className="absolute left-2 top-1 hidden text-[11px] uppercase tracking-[0.3em] text-sage/52 md:block">
              Open a card to follow the thread
            </div>

            {rootTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                childCount={
                  topics.filter((entry) => entry.parentId === topic.id).length
                }
                isActive={topic.id === selectedTopicId}
                onSelect={handleSelectTopic}
                onMove={handleMoveTopic}
                cardRef={(node) => {
                  cardRefs.current[topic.id] = node;
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedTopic ? (
        <div ref={panelAnchorRef}>
          <TopicPanel
            topic={selectedTopic}
            topics={topics}
            onClose={() => setSelectedTopicId(null)}
            onUpdateTopic={updateTopic}
            onSelectTopic={handleSelectTopic}
            onToggleChecklist={handleToggleChecklist}
            onAddChecklistItem={handleAddChecklistItem}
            onAddSubtopic={handleAddSubtopic}
          />
        </div>
      ) : null}
    </main>
  );
}
