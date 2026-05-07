import { CountScoreCard } from "./CountScoreCard";
import { useScorecard } from "./scorecard-context";

export function RiversScoreCard() {
  const { riverLength, riverScore, setRiverLength } = useScorecard();

  return (
    <CountScoreCard
      label="Rivers"
      helper="Enter river length (1-2: 1pt, 3-4: 3pts, 5+: 7pts)"
      value={riverLength}
      onChange={setRiverLength}
      points={riverScore}
      inputLabel="Length"
      iconSrc="/icons/rivers.png"
      categoryClass="scorecard-category scorecard-category-rivers"
    />
  );
}
