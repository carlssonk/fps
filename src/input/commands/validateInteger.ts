export const validateInteger = (
  inputValue: string,
  min?: number,
  max?: number
) => {
  let integerize = Number(parseInt(inputValue));

  if (typeof integerize !== 'number' || isNaN(integerize)) return false;

  if (min !== undefined && integerize < min) integerize = Math.abs(integerize);
  if (max !== undefined && integerize > max) return max;

  return integerize;
};
