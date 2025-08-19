function main(str) {
  if (!str || str.length % 2 !== 0) {
    // 如果字符串为空或长度为奇数，则不可能匹配成功
    return false;
  }
  const stack = [];
  const pairs = { ")": "(", "}": "{", "]": "[" };
  for (let char of str) {
    // 遍历字符串中的每个字符
    if (pairs[char]) {
      // 如果是右括号，则检查栈顶元素
      const top = stack.pop();

      if (pairs[char] !== top) {
        return false; // 如果栈顶元素不匹配，则返回 false
      }
    } else {
      stack.push(char); // 如果是左括号，则入栈
    }
  }
  return stack.length === 0; // 如果栈为空，则所有括号匹配成功
}

// 示例
console.log(main("()")); // true
console.log(main("()[]{}")); // true
console.log(main("(]")); // false
console.log(main("([)]")); // false
console.log(main("{[]}"));
