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
    <section className={`card scorecard-card ${categoryClass} border border-base-300 bg-base-100 shadow-sm`}>
      <div className="card-body gap-3 p-4">
        <div className="flex items-start gap-3">
          {iconSrc ? (
            <img src={iconSrc} alt="" aria-hidden="true" className="scorecard-icon h-8 w-8 rounded-full object-cover" />
          ) : null}
          <div>
            <h2 className="card-title text-base">{label}</h2>
            <p className="text-xs text-base-content/70">{helper}</p>
          </div>
        </div>

        <label className="label px-0 py-0.5">
          <span className="label-text text-xs font-semibold uppercase tracking-wide">{inputLabel}</span>
        </label>
        <div className="join w-full">
          <button
            type="button"
            aria-label={`Decrease ${label} count`}
            onClick={() => onChange(String(Math.max(0, parsePointsInput(value) - 1)))}
            className="btn btn-outline join-item w-10 px-0 text-lg">
            -
          </button>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            type="number"
            min={0}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="input input-bordered join-item w-full text-center"
          />
          <button
            type="button"
            aria-label={`Increase ${label} count`}
            onClick={() => onChange(String(parsePointsInput(value) + 1))}
            className="btn btn-outline join-item w-10 px-0 text-lg">
            +
          </button>
        </div>

        <div className="mt-1">
          <span className="badge badge-outline scorecard-points-badge">Points: {points}</span>
        </div>
      </div>
    </section>
  );
}
