function fibs(n) {
  let fibonacci = [];
  for (let i = 0; i < n; i++) {
    if (i == 0 || i == 1) fibonacci.push(i);
    else fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }
  return fibonacci;
}

function fibsRec(n) {
  if (n <= 0) return [];
  if (n == 1) {
    return [0];
  }
  if (n == 2) {
    return [0, 1];
  }
  const arr = fibsRec(n - 1);
  return arr.concat(arr[arr.length - 1] + arr[arr.length - 2]);
}
