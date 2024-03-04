// string 通过动态数组来实现的， 拼接可能导致多次扩容
// Array.join 可能实现: 提前扩容至指定容量
function my_join(str, array) {
  if (!array.length) return '';
  let s = array[0].toString();

  for (let i = 1; i < array.length; i++ ) {
    s += str + array[i];
  }
  console.log(s);
  return s;
}

// my_join('-', [1, 2, 3, 4]);
// my_join('-', [1]);
// my_join('-', []);


let a = [1, 2,3];
for (i of  a) {
  console.log(i);
}