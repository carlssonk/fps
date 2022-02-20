// Boolean in this case is 0 (false) or 1 (true)
export const validateBoolean = (inputValue: string) => {
  const booleanize = Number(parseInt(inputValue));

  if (typeof booleanize !== 'number' || isNaN(booleanize)) return false;

  return booleanize > 0 ? 1 : 0;
};
