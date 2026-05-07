import { TieredScoreCard } from "./TieredScoreCard";
import { useScorecard } from "./scorecard-context";

export function MountainsScoreCard() {
  const { mountainCounts, mountainPoints, setMountainTierCount } = useScorecard();

  return (
    <TieredScoreCard
      label="Mountains"
      counts={mountainCounts}
      points={mountainPoints}
      onChange={setMountainTierCount}
      iconSrc="/icons/mountains.png"
      categoryClass="scorecard-category scorecard-category-mountains"
    />
  );
}
