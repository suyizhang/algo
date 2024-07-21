


function randomNumber(n) {
  const nums = Array(n);

  for (let i = 0; i < n; i++) {
    nums[i] = i + 1;
  }

  for (let i = 0; i < n; i++) {
    const r = Math.floor(Math.random() * (i + 1));
    [ nums[i], nums[r] ] = [ nums[r], nums[i] ];
  }

  console.log(nums);
  return nums;
}


function find(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;  
}