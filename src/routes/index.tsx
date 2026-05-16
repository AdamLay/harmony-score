import { createFileRoute } from "@tanstack/react-router";
import {
  AnimalsScoreCard,
  BuildingsScoreCard,
  FieldsScoreCard,
  MountainsScoreCard,
  RiversScoreCard,
  ScorecardProvider,
  TotalScorePanel,
  TreesScoreCard,
} from "../components/scorecard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="min-h-screen bg-base-200 px-2 py-2 sm:py-12">
      <section className="mx-auto w-full max-w-5xl rounded-box border border-base-300 bg-base-100 p-5 shadow-xl sm:p-8">
        <h1 className="mb-2 text-3xl font-black tracking-tight sm:text-5xl text-center">
          HARMONIES
        </h1>

        <ScorecardProvider>
          <div className="grid gap-4 sm:grid-cols-2">
            <TreesScoreCard />
            <MountainsScoreCard />
            <FieldsScoreCard />
            <BuildingsScoreCard />
            <RiversScoreCard />
            <AnimalsScoreCard />
          </div>

          <TotalScorePanel />
        </ScorecardProvider>
      </section>
    </main>
  );
}
