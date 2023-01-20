export const filterKeyOfArr = <I>(arr: I[], key: keyof I) => {
  return arr.reduce((filterItems, item) => [...filterItems, item[key]], []);
};
