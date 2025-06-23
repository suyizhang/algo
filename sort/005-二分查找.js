function binarySearch(arr, target) {
    const len = arr.length;
    let left = 0;
    let right = len - 1;
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(arr[mid] === target) {
            return mid;
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}