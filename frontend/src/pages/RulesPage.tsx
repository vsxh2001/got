import { Layout } from "../components/Layout";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-purple-300 mb-4">{title}</h2>
    <div className="text-gray-300 space-y-3">{children}</div>
  </div>
);

export function RulesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-purple-300 mb-8 text-center">Sword Fighting Championship</h1>
            
            <Section title="Overview">
              <p className="text-lg">
                The <span className="text-purple-200 font-semibold">Sword Fighting Championship</span> is a structured competitive league designed to transform sword fighting into a more recognized and institutionalized sport.
              </p>
            </Section>

            <Section title="Game Structure">
              <ul className="list-disc list-inside space-y-2">
                <li>The championship consists of multiple <span className="text-purple-200">seasons</span>, each containing <span className="text-purple-200">three matches</span>.</li>
                <li>Teams accumulate points throughout the season.</li>
                <li>At the end of the season, the team with the highest total score is declared the <span className="text-purple-200">champion</span>.</li>
              </ul>
            </Section>

            <Section title="Match Format">
              <ul className="list-disc list-inside space-y-2">
                <li>Each match consists of <span className="text-purple-200">six teams</span>, with <span className="text-purple-200">six players per team</span>.</li>
                <li>The match is divided into <span className="text-purple-200">six rounds</span>, each lasting <span className="text-purple-200">10 minutes</span>.</li>
                <li>At the end of each round, points are recorded and rankings are updated accordingly.</li>
              </ul>
            </Section>

            <Section title="Scoring System">
              <div className="space-y-4">
                <p>The battlefield contains <span className="text-purple-200">10 lighted cubes</span>, each assigned to a control panel:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="text-purple-200">Regular Cubes (7)</span>: 2 points each</li>
                  <li><span className="text-purple-200">Large Cubes (2)</span>: 3 points each</li>
                  <li><span className="text-purple-200">Throne Cube (1)</span>: 5-8 points</li>
                </ul>
                <div className="bg-gray-900/30 p-4 rounded-lg border-l-4 border-purple-400">
                  <p className="font-semibold text-purple-200">Throne Cube Special Rule:</p>
                  <p>The controlling team gains extra points but suffers a debuff, increasing respawn time.</p>
                </div>
              </div>
            </Section>

            <Section title="Team Composition">
              <div className="space-y-4">
                <p>Each team consists of <span className="text-purple-200">six players</span> with the following roles:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="text-purple-200">4 players</span> wielding swords and shields</li>
                  <li><span className="text-purple-200">1 player</span> wielding a spear</li>
                  <li><span className="text-purple-200">1 player</span> wielding dual swords</li>
                </ul>
                <p>Each player has <span className="text-purple-200">2 HP (hit points)</span>.</p>
              </div>
            </Section>

            <Section title="Arena Layout">
              <div className="space-y-4">
                <p>The field is designed with <span className="text-purple-200">strategically placed scoring cubes</span>.</p>
                <p>Special zones include:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="text-purple-200">Throne Zone</span> (center)</li>
                  <li><span className="text-purple-200">Respawn Zones</span> (two areas where eliminated players return)</li>
                </ul>
              </div>
            </Section>

            <Section title="Respawn System">
              <ul className="list-disc list-inside space-y-2">
                <li>Each respawn area contains <span className="text-purple-200">two rings</span></li>
                <li>A defeated player must move to the <span className="text-purple-200">first ring</span> and wait for the <span className="text-purple-200">gong (every 40 seconds)</span></li>
                <li>If their team controls the Throne Cube, they must wait for an <span className="text-purple-200">additional gong</span> before re-entering</li>
                <li>The first eliminated player enters the first ring, while players defeated afterward proceed to the second ring</li>
              </ul>
            </Section>

            <Section title="Objective">
              <p className="text-lg font-medium text-center text-purple-200">
                Teams must strategically capture and defend control points, eliminate opponents, and manage respawn times to maximize their score and win the championship!
              </p>
            </Section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
