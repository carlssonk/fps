// Boolean in this case is 0 (false) or 1 (true)
const bools = [0, 1];
export const validateBoolean = (inputValue: string): number | boolean => {
  const booleanize = Number(parseInt(inputValue));

  return bools.includes(booleanize) ? booleanize : false;
};
