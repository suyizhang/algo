function main(arr) {
  let len = arr.length;
  if (len <= 1) {
    return len;
  }
  /**
   * 动态规划数组，dp[i] 表示以 arr[i] 结尾的最长递增子序列的长度
   */
  let dp = new Array(len).fill(1);
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp); // 返回 dp 数组中的最大值，即最长递增子序列的长度
}
