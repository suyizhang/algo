function quadratic(n) {
  const numMatrix = Array(n).fill(null).map(() => Array(n).fill(null));

  const numList = [];

  for (let i = 0; i < n; i++) {
    const tmp = [];

    for (let j = 0; j < n; j++) {
      tmp.push(0);
    }

    numList.pish(tmp);
  }

  console.log(numList);
}