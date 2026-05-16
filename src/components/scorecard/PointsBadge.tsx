export default function PointsBadge({ points }: { points: number }) {
  return (
    <div className="mt-1 badge badge-outline scorecard-points-badge w-full px-4 py-1 flex h-auto items-center">
      <p className="flex-1">Points: </p>
      <p className="font-bold text-xl text-right">{points}</p>
    </div>
  );
}
