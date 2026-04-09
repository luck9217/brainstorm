import BoardShell from "@/components/board-shell";
import { initialTopics } from "@/lib/mock-data";

export default function Home() {
  return <BoardShell initialTopics={initialTopics} />;
}
