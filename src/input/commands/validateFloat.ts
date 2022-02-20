export const validateFloat = (inputValue: string): number | boolean => {
  const floatinize = Number(inputValue);

  return typeof floatinize === 'number' ? floatinize : false;
};
