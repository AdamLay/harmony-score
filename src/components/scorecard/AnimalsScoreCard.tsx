import { CountScoreCard } from "./CountScoreCard";
import { useScorecard } from "./scorecard-context";

export function AnimalsScoreCard() {
  const { animalPoints, animalsScore, setAnimalPoints } = useScorecard();

  return (
    <CountScoreCard
      label="Animals"
      helper="Enter scored animal points"
      value={animalPoints}
      onChange={setAnimalPoints}
      points={animalsScore}
      inputLabel="Points"
      categoryClass="scorecard-category scorecard-category-animals"
    />
  );
}
