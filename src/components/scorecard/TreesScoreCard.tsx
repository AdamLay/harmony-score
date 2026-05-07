import { TieredScoreCard } from "./TieredScoreCard";
import { useScorecard } from "./scorecard-context";

export function TreesScoreCard() {
  const { treeCounts, treePoints, setTreeTierCount } = useScorecard();

  return (
    <TieredScoreCard
      label="Trees"
      counts={treeCounts}
      points={treePoints}
      onChange={setTreeTierCount}
      iconSrc="/icons/trees.png"
      categoryClass="scorecard-category scorecard-category-trees"
    />
  );
}
