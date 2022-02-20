export const validateInteger = (
  inputValue: string,
  min: number,
  max: number
) => {
  const integerize = Number(parseInt(inputValue));

  if (typeof integerize !== 'number') return false;

  if (integerize < min) return min;
  if (integerize > max) return max;

  return integerize;
};
