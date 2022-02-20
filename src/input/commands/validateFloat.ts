export const validateFloat = (
  inputValue: string,
  min?: number,
  max?: number
) => {
  let floatinize = Number(inputValue);

  if (typeof floatinize !== 'number' || isNaN(floatinize)) return false;

  if (min !== undefined && floatinize < min) floatinize = Math.abs(floatinize);
  if (max !== undefined && floatinize > max) return max;

  return floatinize;
};
