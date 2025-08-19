function quickSort (arr) {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}

console.log(quickSort([1, 3, 2, 4, 5, 0]));
console.log(quickSort([1, 3, 2, 4, 5, 0, 2, 7, 9]));
