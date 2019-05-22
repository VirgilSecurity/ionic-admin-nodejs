export const addDays = (moment: Date, days: number): Date => {
  const result = new Date();
  result.setDate(moment.getDate() + days);
  return result;
};

export const subtractDays = (moment: Date, days: number): Date => addDays(moment, -days);
