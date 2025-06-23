function bubbleSort(arr) {
    const len = arr.length;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }

    return arr;
}

console.log(bubbleSort([1, 3, 2, 4, 5, 0]));
