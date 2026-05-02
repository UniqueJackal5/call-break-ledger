export const calculateRoundScore = (call: number, actual: number): number => {
  if (actual >= call) {
    // Score = call + 0.1 * (actual - call)
    // Using integers (score * 10) to avoid floating point issues
    return call * 10 + (actual - call);
  } else {
    // Score = -call
    return -call * 10;
  }
};

export const formatScore = (internalScore: number | null): string => {
  if (internalScore === null) return '-';
  const score = internalScore / 10;
  return score.toFixed(1).replace('.0', '');
};

export const calculateTotalScore = (playerRoundScores: (number | null)[]): number => {
  return playerRoundScores.reduce((acc: number, curr: number | null) => acc + (curr || 0), 0);
};
