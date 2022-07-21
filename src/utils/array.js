export function chunk(arr, n) {
  const tempArray = [];
  const arrayLength = arr.length;

  for (let index = 0; index < arrayLength; index += n) {
    const thisChunk = arr.slice(index, index + n);
    tempArray.push(thisChunk);
  }

  return tempArray;
}

export function flatten(arr) {
  // eslint-disable-next-line prefer-spread
  return [].concat.apply([], arr);
}
