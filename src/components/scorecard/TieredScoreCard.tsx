import PointsBadge from "./PointsBadge";
import { parsePointsInput, type Tier, type TierCounts } from "./scorecard-context";

const TIER_OPTIONS: Tier[] = [1, 3, 7];

export function TieredScoreCard({
  label,
  counts,
  onChange,
  points,
  iconSrc,
  categoryClass = "scorecard-category",
}: {
  label: string;
  counts: TierCounts;
  onChange: (tier: Tier, nextValue: string) => void;
  points: number;
  iconSrc?: string;
  categoryClass?: string;
}) {
  return (
    <section
      className={`card scorecard-card ${categoryClass} border border-base-300 bg-base-100 shadow-sm`}
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-start gap-3">
          {iconSrc ? (
            <img
              src={iconSrc}
              alt=""
              aria-hidden="true"
              className="scorecard-icon h-12 w-12 rounded-full object-cover"
            />
          ) : null}
          <div>
            <h2 className="card-title text-base">{label}</h2>
            <p className="text-xs text-base-content/70">
              Enter how many 1-, 3-, and 7-point scores were earned.
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          {TIER_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center justify-between gap-2 rounded-box border border-base-300 bg-base-200 p-2"
            >
              <span className="text-sm text-base-content/80">{option}pt count</span>
              <div className="flex items-center overflow-hidden rounded-field border border-base-300 bg-base-100">
                <button
                  type="button"
                  aria-label={`Decrease ${label} ${option}-point count`}
                  onClick={() =>
                    onChange(option, String(Math.max(0, parsePointsInput(counts[option]) - 1)))
                  }
                  className="btn btn-ghost h-10 min-h-10 w-10 rounded-none border-0 px-0"
                >
                  -
                </button>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="number"
                  min={0}
                  step={1}
                  value={counts[option]}
                  onChange={(event) => onChange(option, event.target.value)}
                  className="h-10 w-16 border-x border-base-300 bg-transparent text-center text-sm tabular-nums outline-none [appearance:textfield]"
                />
                <button
                  type="button"
                  aria-label={`Increase ${label} ${option}-point count`}
                  onClick={() => onChange(option, String(parsePointsInput(counts[option]) + 1))}
                  className="btn btn-ghost h-10 min-h-10 w-10 rounded-none border-0 px-0"
                >
                  +
                </button>
              </div>
            </label>
          ))}
        </div>
        <PointsBadge points={points} />
      </div>
    </section>
  );
}
