import PointsBadge from "./PointsBadge";
import { parsePointsInput } from "./scorecard-context";

export function CountScoreCard({
  label,
  helper,
  value,
  onChange,
  points,
  inputLabel = "Count",
  iconSrc,
  categoryClass = "scorecard-category",
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (next: string) => void;
  points: number;
  inputLabel?: string;
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
            <p className="text-xs text-base-content/70">{helper}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-box border border-base-300 bg-base-200 p-2">
          <label className="label px-0 py-0.5 flex-1">
            <span className="label-text text-xs font-semibold uppercase tracking-wide">
              {inputLabel}
            </span>
          </label>
          <div className="flex flex-1 items-center overflow-hidden rounded-field border border-base-300 bg-base-100">
            <button
              type="button"
              aria-label={`Decrease ${label} count`}
              onClick={() => onChange(String(Math.max(0, parsePointsInput(value) - 1)))}
              className="btn btn-ghost h-10 min-h-10 w-10 rounded-none border-0 px-0 text-lg"
            >
              -
            </button>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              type="number"
              min={0}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="h-10 w-full border-x border-base-300 bg-transparent text-center tabular-nums outline-none [appearance:textfield]"
            />
            <button
              type="button"
              aria-label={`Increase ${label} count`}
              onClick={() => onChange(String(parsePointsInput(value) + 1))}
              className="btn btn-ghost h-10 min-h-10 w-10 rounded-none border-0 px-0 text-lg"
            >
              +
            </button>
          </div>
        </div>

        <PointsBadge points={points} />
      </div>
    </section>
  );
}
