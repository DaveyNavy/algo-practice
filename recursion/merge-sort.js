function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  let sortedArr = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      sortedArr.push(arr1[i]);
      i++;
    } else {
      sortedArr.push(arr2[j]);
      j++;
    }
  }
  return sortedArr.concat(arr1.slice(i)).concat(arr2.slice(j));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = arr.length / 2;
  const arr1 = mergeSort(arr.slice(0, mid));
  const arr2 = mergeSort(arr.slice(mid));
  return merge(arr1, arr2);
}

console.log(mergeSort([1, 5, 3, 7, 325, 23, 123, 3, 3]));
