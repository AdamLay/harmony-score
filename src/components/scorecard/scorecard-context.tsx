import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Tier = 1 | 3 | 7;

type TierCounts = Record<Tier, string>;

type ScorecardContextValue = {
  treeCounts: TierCounts;
  mountainCounts: TierCounts;
  fieldCount: string;
  buildingCount: string;
  riverLength: string;
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
  setRiverLength: (nextValue: string) => void;
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
  if (length <= 0) return 0;
  if (length <= 2) return 1;
  if (length <= 4) return 3;
  return 7;
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
  const [riverLength, setRiverLength] = useState("0");
  const [animalPoints, setAnimalPoints] = useState("0");

  const treePoints = perTierScore(treeCounts);
  const mountainPoints = perTierScore(mountainCounts);
  const fieldsScore = parsePointsInput(fieldCount) * 5;
  const buildingsScore = parsePointsInput(buildingCount) * 5;
  const riverScore = riverPointsFromLength(parsePointsInput(riverLength));
  const animalsScore = parsePointsInput(animalPoints);
  const totalScore = treePoints + mountainPoints + fieldsScore + buildingsScore + riverScore + animalsScore;

  const value = useMemo<ScorecardContextValue>(
    () => ({
      treeCounts,
      mountainCounts,
      fieldCount,
      buildingCount,
      riverLength,
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
      setRiverLength,
      setAnimalPoints,
      resetScorecard: () => {
        setTreeCounts(EMPTY_TIER_COUNTS);
        setMountainCounts(EMPTY_TIER_COUNTS);
        setFieldCount("0");
        setBuildingCount("0");
        setRiverLength("0");
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
      riverLength,
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
