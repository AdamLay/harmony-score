import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Tier = 1 | 3 | 7;

type TierCounts = Record<Tier, string>;

type ScorecardContextValue = {
  treeCounts: TierCounts;
  mountainCounts: TierCounts;
  fieldCount: string;
  buildingCount: string;
  riverLengths: string[];
  animalPoints: string;
  treePoints: number;
  mountainPoints: number;
  fieldsScore: number;
  buildingsScore: number;
  riverScore: number;
  animalsScore: number;
  totalScore: number;
  setTreeTierCount: (tier: Tier, nextValue: string) => void;
  setMountainTierCount: (tier: Tier, nextValue: string) => void;
  setFieldCount: (nextValue: string) => void;
  setBuildingCount: (nextValue: string) => void;
  setRiverLength: (index: number, nextValue: string) => void;
  addRiver: () => void;
  removeRiver: (index: number) => void;
  setAnimalPoints: (nextValue: string) => void;
  resetScorecard: () => void;
};

const EMPTY_TIER_COUNTS: TierCounts = {
  1: "0",
  3: "0",
  7: "0",
};

const TIER_OPTIONS: Tier[] = [1, 3, 7];

export function parsePointsInput(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function riverPointsFromLength(length: number) {
  if (length <= 1) return 0;
  if (length === 2) return 2;
  if (length === 3) return 5;
  if (length === 4) return 8;
  if (length === 5) return 11;
  if (length === 6) return 15;
  return 15 + (length - 6) * 4;
}

function perTierScore(counts: TierCounts) {
  return TIER_OPTIONS.reduce((score, tier) => score + parsePointsInput(counts[tier]) * tier, 0);
}

const ScorecardContext = createContext<ScorecardContextValue | null>(null);

export function ScorecardProvider({ children }: { children: ReactNode }) {
  const [treeCounts, setTreeCounts] = useState<TierCounts>(EMPTY_TIER_COUNTS);
  const [mountainCounts, setMountainCounts] = useState<TierCounts>(EMPTY_TIER_COUNTS);
  const [fieldCount, setFieldCount] = useState("0");
  const [buildingCount, setBuildingCount] = useState("0");
  const [riverLengths, setRiverLengths] = useState<string[]>(["1"]);
  const [animalPoints, setAnimalPoints] = useState("0");

  const treePoints = perTierScore(treeCounts);
  const mountainPoints = perTierScore(mountainCounts);
  const fieldsScore = parsePointsInput(fieldCount) * 5;
  const buildingsScore = parsePointsInput(buildingCount) * 5;
  const riverScore = riverLengths.reduce(
    (sum, len) => sum + riverPointsFromLength(parsePointsInput(len)),
    0,
  );
  const animalsScore = parsePointsInput(animalPoints);
  const totalScore =
    treePoints + mountainPoints + fieldsScore + buildingsScore + riverScore + animalsScore;

  const value = useMemo<ScorecardContextValue>(
    () => ({
      treeCounts,
      mountainCounts,
      fieldCount,
      buildingCount,
      riverLengths,
      animalPoints,
      treePoints,
      mountainPoints,
      fieldsScore,
      buildingsScore,
      riverScore,
      animalsScore,
      totalScore,
      setTreeTierCount: (tier, nextValue) => {
        setTreeCounts((current) => ({ ...current, [tier]: nextValue }));
      },
      setMountainTierCount: (tier, nextValue) => {
        setMountainCounts((current) => ({ ...current, [tier]: nextValue }));
      },
      setFieldCount,
      setBuildingCount,
      setRiverLength: (index, nextValue) => {
        setRiverLengths((current) => current.map((v, i) => (i === index ? nextValue : v)));
      },
      addRiver: () => {
        setRiverLengths((current) => [...current, "1"]);
      },
      removeRiver: (index) => {
        setRiverLengths((current) => current.filter((_, i) => i !== index));
      },
      setAnimalPoints,
      resetScorecard: () => {
        setTreeCounts(EMPTY_TIER_COUNTS);
        setMountainCounts(EMPTY_TIER_COUNTS);
        setFieldCount("0");
        setBuildingCount("0");
        setRiverLengths(["1"]);
        setAnimalPoints("0");
      },
    }),
    [
      animalPoints,
      animalsScore,
      buildingCount,
      buildingsScore,
      fieldCount,
      fieldsScore,
      mountainCounts,
      mountainPoints,
      riverLengths,
      riverScore,
      totalScore,
      treeCounts,
      treePoints,
    ],
  );

  return <ScorecardContext.Provider value={value}>{children}</ScorecardContext.Provider>;
}

export function useScorecard() {
  const context = useContext(ScorecardContext);

  if (!context) {
    throw new Error("useScorecard must be used inside ScorecardProvider");
  }

  return context;
}

export type { Tier, TierCounts };
