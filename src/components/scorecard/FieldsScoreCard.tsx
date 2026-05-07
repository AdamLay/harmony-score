import { CountScoreCard } from "./CountScoreCard";
import { useScorecard } from "./scorecard-context";

export function FieldsScoreCard() {
  const { fieldCount, fieldsScore, setFieldCount } = useScorecard();

  return (
    <CountScoreCard
      label="Fields"
      helper="5 points per field"
      value={fieldCount}
      onChange={setFieldCount}
      points={fieldsScore}
      iconSrc="/icons/fields.png"
      categoryClass="scorecard-category scorecard-category-fields"
    />
  );
}
