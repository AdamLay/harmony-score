import { CountScoreCard } from "./CountScoreCard";
import { useScorecard } from "./scorecard-context";

export function BuildingsScoreCard() {
  const { buildingCount, buildingsScore, setBuildingCount } = useScorecard();

  return (
    <CountScoreCard
      label="Buildings"
      helper="5 points per building"
      value={buildingCount}
      onChange={setBuildingCount}
      points={buildingsScore}
      iconSrc="/icons/buildings.png"
      categoryClass="scorecard-category scorecard-category-buildings"
    />
  );
}
