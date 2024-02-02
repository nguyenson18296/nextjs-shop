export const isEmpty = (val: any): boolean =>
  val == null || !(Object.keys(val) || val).length;

export const remove = <T>(array: T[], predicate: (value: T) => boolean): T[] => {
  const removed: T[] = [];

  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      removed.push(...array.splice(i, 1));
    }
  }

  return removed;
};
