function heapSort(arr) {
    const len = arr.length;
    if (len <= 1) {
        return arr;
    }
    const heapSize = len;
    buildMaxHeap(arr, heapSize);
    for(let i = len - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapSize--;
        maxHeapify(arr, 0, heapSize);
    }
    return arr;
}

function buildMaxHeap(arr, heapSize) {
    for(let i = Math.floor(heapSize / 2); i >= 0; i--) {
        maxHeapify(arr, i, heapSize);
    }
}

function maxHeapify(arr, i, heapSize) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if(left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    if(right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    if(largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        maxHeapify(arr, largest, heapSize);
    }
}
