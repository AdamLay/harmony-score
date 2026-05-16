export default function PointsBadge({points}: { points: number }) {
  return <div className="mt-1">
          <span className="badge badge-outline scorecard-points-badge">Points: {points}</span>
        </div>;
}