function getMinMax(str) {
  let numbers = str
    .split(' ')
    .filter(item=> Number(item));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}  