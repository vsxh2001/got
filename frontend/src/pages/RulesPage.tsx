import { Layout } from "../components/Layout";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
    <div className="relative px-7 py-6 bg-slate-800/50 ring-1 ring-gray-700/50 rounded-lg leading-none mb-8">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 mb-4">
        {title}
      </h2>
      <div className="text-gray-300 space-y-3">{children}</div>
    </div>
  </div>
);

export function RulesPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-0 min-h-screen pt-8">
        <h1 className="text-5xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-red-200 to-amber-100 mb-12 py-3">
          Sword Fighting Championship
        </h1>

        <Section title="Overview">
          <p className="text-lg">
            The{" "}
            <span className="font-medium text-indigo-300">
              Sword Fighting Championship
            </span>{" "}
            is a structured competitive league designed to transform sword
            fighting into a more recognized and institutionalized sport.
          </p>
        </Section>

        <Section title="Game Structure">
          <ul className="list-disc list-inside space-y-2 marker:text-indigo-400">
            <li>
              The championship consists of multiple{" "}
              <span className="font-medium text-indigo-300">seasons</span>, each
              containing{" "}
              <span className="font-medium text-indigo-300">three matches</span>
              .
            </li>
            <li>Teams accumulate points throughout the season.</li>
            <li>
              At the end of the season, the team with the highest total score is
              declared the{" "}
              <span className="font-medium text-indigo-300">champion</span>.
            </li>
          </ul>
        </Section>

        <Section title="Match Format">
          <ul className="list-disc list-inside space-y-2 marker:text-indigo-400">
            <li>
              Each match consists of{" "}
              <span className="font-medium text-indigo-300">six teams</span>,
              with{" "}
              <span className="font-medium text-indigo-300">
                six players per team
              </span>
              .
            </li>
            <li>
              The match is divided into{" "}
              <span className="font-medium text-indigo-300">six rounds</span>,
              each lasting{" "}
              <span className="font-medium text-indigo-300">10 minutes</span>.
            </li>
            <li>
              At the end of each round, points are recorded and rankings are
              updated accordingly.
            </li>
          </ul>
        </Section>

        <Section title="Scoring System">
          <div className="space-y-4">
            <p>
              The battlefield contains{" "}
              <span className="font-medium text-indigo-300">
                10 lighted cubes
              </span>
              , each assigned to a control panel:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-indigo-400">
              <li>
                <span className="font-medium text-indigo-300">
                  Regular Cubes (7)
                </span>
                : 2 points each
              </li>
              <li>
                <span className="font-medium text-indigo-300">
                  Large Cubes (2)
                </span>
                : 3 points each
              </li>
              <li>
                <span className="font-medium text-indigo-300">
                  Throne Cube (1)
                </span>
                : 5-8 points
              </li>
            </ul>
            <div className="bg-gray-900/30 p-4 rounded-lg border-l-4 border-purple-400">
              <p className="font-semibold text-purple-200">
                Throne Cube Special Rule:
              </p>
              <p>
                The controlling team gains extra points but suffers a debuff,
                increasing respawn time.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Team Composition">
          <div className="space-y-4">
            <p>
              Each team consists of{" "}
              <span className="font-medium text-indigo-300">six players</span>{" "}
              with the following roles:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-indigo-400">
              <li>
                <span className="font-medium text-indigo-300">4 players</span>{" "}
                wielding swords and shields
              </li>
              <li>
                <span className="font-medium text-indigo-300">1 player</span>{" "}
                wielding a spear
              </li>
              <li>
                <span className="font-medium text-indigo-300">1 player</span>{" "}
                wielding dual swords
              </li>
            </ul>
            <p>
              Each player has{" "}
              <span className="font-medium text-indigo-300">
                2 HP (hit points)
              </span>
              .
            </p>
          </div>
        </Section>

        <Section title="Arena Layout">
          <div className="space-y-4">
            <p>
              The field is designed with{" "}
              <span className="font-medium text-indigo-300">
                strategically placed scoring cubes
              </span>
              .
            </p>
            <p>Special zones include:</p>
            <ul className="list-disc list-inside space-y-2 marker:text-indigo-400">
              <li>
                <span className="font-medium text-indigo-300">Throne Zone</span>{" "}
                (center)
              </li>
              <li>
                <span className="font-medium text-indigo-300">
                  Respawn Zones
                </span>{" "}
                (two areas where eliminated players return)
              </li>
            </ul>
          </div>
        </Section>

        <Section title="Respawn System">
          <ul className="list-disc list-inside space-y-2 marker:text-indigo-400">
            <li>
              Each respawn area contains{" "}
              <span className="font-medium text-indigo-300">two rings</span>
            </li>
            <li>
              A defeated player must move to the{" "}
              <span className="font-medium text-indigo-300">first ring</span>{" "}
              and wait for the{" "}
              <span className="font-medium text-indigo-300">
                gong (every 40 seconds)
              </span>
            </li>
            <li>
              If their team controls the Throne Cube, they must wait for an{" "}
              <span className="font-medium text-indigo-300">
                additional gong
              </span>{" "}
              before re-entering
            </li>
            <li>
              The first eliminated player enters the first ring, while players
              defeated afterward proceed to the second ring
            </li>
          </ul>
        </Section>

        <Section title="Objective">
          <p className="text-lg font-medium text-center text-indigo-300">
            Teams must strategically capture and defend control points,
            eliminate opponents, and manage respawn times to maximize their
            score and win the championship!
          </p>
        </Section>
      </div>
    </Layout>
  );
}
