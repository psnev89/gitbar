export const useHelpers = () => {
  const createHash = (numOfChars = 6) => {
    return Math.random().toString(36).slice(-Number(numOfChars));
  };

  return {
    createHash,
  };
};
