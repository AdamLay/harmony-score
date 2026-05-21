import PointsBadge from "./PointsBadge";
import { parsePointsInput, useScorecard } from "./scorecard-context";

export function RiversScoreCard() {
  const { riverLengths, riverScore, setRiverLength, addRiver, removeRiver } = useScorecard();

  return (
    <section className="card scorecard-card scorecard-category scorecard-category-rivers border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-3 p-4">
        <div className="flex items-start gap-3">
          <img
            src="/icons/rivers.png"
            alt=""
            aria-hidden="true"
            className="scorecard-icon h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h2 className="card-title text-base">Rivers</h2>
            <p className="text-xs text-base-content/70">
              Length scoring: 1=0, 2=2, 3=5, 4=8, 5=11, 6=15, +4 per tile beyond 6.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          {riverLengths.map((len, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 rounded-box border border-base-300 bg-base-200 p-2"
            >
              <span className="label-text text-xs font-semibold uppercase tracking-wide flex-1">
                River {index + 1}
              </span>
              <div className="flex items-center overflow-hidden rounded-field border border-base-300 bg-base-100">
                <button
                  type="button"
                  aria-label={`Decrease river ${index + 1} length`}
                  onClick={() =>
                    setRiverLength(index, String(Math.max(1, parsePointsInput(len) - 1)))
                  }
                  className="btn btn-ghost h-10 min-h-10 w-10 rounded-none border-0 px-0 text-lg"
                >
                  -
                </button>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="number"
                  min={1}
                  step={1}
                  value={len}
                  onChange={(event) => setRiverLength(index, event.target.value)}
                  className="h-10 w-16 border-x border-base-300 bg-transparent text-center text-sm tabular-nums outline-none [appearance:textfield]"
                />
                <button
                  type="button"
                  aria-label={`Increase river ${index + 1} length`}
                  onClick={() => setRiverLength(index, String(parsePointsInput(len) + 1))}
                  className="btn btn-ghost h-10 min-h-10 w-10 rounded-none border-0 px-0 text-lg"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                aria-label={`Remove river ${index + 1}`}
                onClick={() => removeRiver(index)}
                className="btn btn-ghost btn-sm h-10 min-h-10 w-10 rounded-field border border-base-300 px-0 text-base text-error"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRiver}
          className="btn btn-ghost btn-sm w-full border border-base-300"
        >
          + Add River
        </button>

        <PointsBadge points={riverScore} />
      </div>
    </section>
  );
}
