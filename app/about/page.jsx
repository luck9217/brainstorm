import Link from "next/link";

export const metadata = {
  title: "Lucas Chavez | Resume",
  description:
    "Resume page for Lucas Chavez, Junior AI Web Developer application.",
};

const technicalSkills = [
  "JavaScript",
  "TypeScript",
  "Dart",
  "HTML",
  "CSS",
  "SQL",
  "Visual Basic",
  "React",
  "Next.js",
  "Redux",
  "Node.js",
  "GraphQL",
  "Firebase",
  "Flutter",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "GitHub",
  "Kanban",
  "SAS Guide",
  "Excel",
  "UX/UI",
  "Agile/Scrum",
];

export default function AboutPage() {
  return (
    <main className="board-surface min-h-screen px-5 py-8 text-ink md:px-10 md:py-12">
      <div className="mx-auto max-w-5xl rounded-[36px] border border-white/55 bg-white/55 p-6 shadow-float backdrop-blur-xl md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-sage/62">
            Resume profile
          </p>
          <Link
            href="/"
            className="rounded-full border border-sage/30 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/62 transition hover:bg-white"
          >
            Back to board cards
          </Link>
        </div>

        <h1 className="mt-5 max-w-[16ch] font-heading text-[clamp(2.6rem,7vw,5rem)] leading-[0.9] text-ink">
          Lucas Chavez
        </h1>

        <p className="mt-5 max-w-3xl text-[15px] leading-8 text-ink/66">
          Adaptable and passionate software developer with hands-on experience
          in web and mobile development. Skilled in responsive user interfaces,
          GitHub workflows, and collaborative delivery. This project reflects my
          practical "100% vibe coding" approach: build fast, iterate quickly,
          and improve with AI-assisted development.
        </p>

        <section className="mt-6 rounded-[28px] border border-white/60 bg-white/70 p-6">
          <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
            About this project
          </h2>
          <p className="mt-4 text-sm leading-8 text-ink/72">
            Brainstorm Space is both a portfolio and a practical playground. I
            built it as a 100% vibe coding project: ship fast, test ideas in
            real UI, and keep improving based on what feels useful. The stack is
            Next.js, React, Tailwind CSS, and GitHub workflows. The goal is
            simple: show how I think, how I build, and how quickly I can turn
            ideas into working product improvements.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-[28px] border border-white/60 bg-white/70 p-6">
            <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
              Contact
            </h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-ink/72">
              <p>Email: LUCK9217@gmail.com</p>
              <p>Phone: +61 467520280</p>
              <p>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/lucas-chavez/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-sage/45 underline-offset-4"
                >
                  linkedin.com/in/lucas-chavez
                </a>
              </p>
              <p>GitHub profile: luck9217</p>
              <p>Role target: Junior AI Web Developer</p>
              <p>Work authorization: Australia</p>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/60 bg-white/70 p-6">
            <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
              Portfolio links
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
              <p>
                GitHub repository:{" "}
                <a
                  href="https://github.com/luck9217/brainstorm"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-sage/45 underline-offset-4"
                >
                  github.com/luck9217/brainstorm
                </a>
              </p>
              <p>
                Live project:{" "}
                <a
                  href="https://luck9217.github.io/brainstorm/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-sage/45 underline-offset-4"
                >
                  luck9217.github.io/brainstorm
                </a>
              </p>
            </div>
          </article>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-[28px] border border-white/60 bg-white/70 p-6">
            <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
              Experience
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-ink/72">
              <p>
                Front End Developer Intern - SoftLabs (Australia), Jul 2025 to
                Oct 2025.
              </p>
              <p>
                Front End Developer Intern - Job Search Ninja (Australia), Jun
                2023 to Dec 2023.
              </p>
              <p>
                SSRS Developer - TELECOM S.A (Argentina), May 2019 to Mar 2021.
              </p>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/60 bg-white/70 p-6">
            <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
              Education
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-ink/72">
              <p>
                Advanced Diploma of Information Technology (Telecommunications
                Network Engineering), National Institute of Technology, Perth.
                Expected completion: 2027.
              </p>
              <p>
                Diploma of Information Technology (Website Development),
                Australian College of Business Intelligence, Sydney. Finished
                Dec 2025.
              </p>
              <p>
                Backend/Frontend Bootcamp, UBA IALAB (Argentina). Finished 2022.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-[28px] border border-white/60 bg-white/70 p-6">
            <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
              Technical skills
            </h2>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-ink/72 md:grid-cols-2">
              {technicalSkills.map((item) => (
                <li key={item} className="rounded-full bg-white/85 px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-white/60 bg-white/70 p-6">
            <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
              Languages and certifications
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-ink/72">
              <p>Languages: English, Spanish.</p>
              <p>Introduction to Linux - IAT Digital Microskill (Oct 2025).</p>
              <p>
                Introduction to Cyber Security - IAT Digital Microskill (Nov
                2025).
              </p>
              <p>
                Introduction to Cloud Computing - IAT Digital Microskill (Jun
                2025).
              </p>
              <p>
                Scrum Foundation Professional Certificate - CertiProf (Jul 2020
                to current).
              </p>
            </div>
          </article>
        </section>

        <section className="mt-5 rounded-[28px] border border-white/60 bg-white/70 p-6">
          <h2 className="text-xs uppercase tracking-[0.28em] text-sage/66">
            Why this fits the role
          </h2>
          <p className="mt-4 text-sm leading-8 text-ink/72">
            I enjoy building quickly, learning from iteration, and collaborating
            directly with technical leadership. My portfolio demonstrates GitHub
            workflow discipline and AI-assisted development habits aligned with
            fast-moving product teams.
          </p>
        </section>
      </div>
    </main>
  );
}
