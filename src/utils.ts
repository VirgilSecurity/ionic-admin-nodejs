export const addDays = (moment: Date, days: number): Date => {
  const result = new Date();
  result.setDate(moment.getDate() + days);
  return result;
};

export const subtractDays = (moment: Date, days: number): Date => addDays(moment, -days);

export const isPlainObject = (obj: any): obj is {} => Object.prototype.toString.call(obj) === '[object Object]';
