import { useScorecard } from "./scorecard-context";

export function TotalScorePanel() {
  const { totalScore, resetScorecard } = useScorecard();

  return (
    <div className="card mt-6 border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="stats bg-base-200 shadow-none">
          <div className="stat px-4 py-2 flex">
            <div className="stat-title text-lg flex-1">Total</div>
            <div className="stat-value text-4xl">{totalScore}</div>
          </div>
        </div>
      </div>
      <div className="card-actions justify-end px-4 pb-4 pt-0">
        <button type="button" className="btn btn-outline" onClick={resetScorecard}>
          Reset Scorecard
        </button>
      </div>
    </div>
  );
}
