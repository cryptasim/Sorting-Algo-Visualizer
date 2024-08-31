import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [arraySize, setArraySize] = useState(10);
  const [sortingSpeed, setSortingSpeed] = useState(50);

  useEffect(() => {
    generateNewArray(); // eslint-disable-next-line
  }, [arraySize]);

  const generateNewArray = () => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSortedIndices([]);
    setComparingIndices([]);
    setSwappingIndices([]);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, 1000 - ms * 10));

  const isSorted = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const bubbleSort = async () => {
    let arr = [...array];
    if (isSorted(arr)) {
      toast.info("Array is already sorted!");
      return;
    }
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparingIndices([j, j + 1]);
        await delay(sortingSpeed);
        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          await delay(sortingSpeed);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay(sortingSpeed);
        }
        setSwappingIndices([]);
      }
      setSortedIndices(prev => [...prev, n - i - 1]);
    }
    setSortedIndices([...Array(n).keys()]);
    setComparingIndices([]);
  };

  const quickSort = async (arr, low, high) => {
    if (low === 0 && high === arr.length - 1 && isSorted(arr)) {
      toast.info("Array is already sorted!");
      return;
    }
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
    if (low === 0 && high === arr.length - 1) {
      setSortedIndices([...Array(arr.length).keys()]);
      setComparingIndices([]);
      setSwappingIndices([]);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setComparingIndices([j, high]);
      await delay(sortingSpeed);
      if (arr[j] < pivot) {
        i++;
        setSwappingIndices([i, j]);
        await delay(sortingSpeed);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await delay(sortingSpeed);
        setSwappingIndices([]);
      }
    }
    setSwappingIndices([i + 1, high]);
    await delay(sortingSpeed);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay(sortingSpeed);
    setSwappingIndices([]);
    return i + 1;
  };

  const mergeSort = async (arr, left, right) => {
    if (left === 0 && right === arr.length - 1 && isSorted(arr)) {
      toast.info("Array is already sorted!");
      return;
    }
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
    if (left === 0 && right === arr.length - 1) {
      setSortedIndices([...Array(arr.length).keys()]);
      setComparingIndices([]);
      setSwappingIndices([]);
    }
  };

  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      setComparingIndices([left + i, mid + 1 + j]);
      await delay(sortingSpeed);
      if (L[i] <= R[j]) {
        setSwappingIndices([k]);
        await delay(sortingSpeed);
        arr[k] = L[i];
        i++;
      } else {
        setSwappingIndices([k]);
        await delay(sortingSpeed);
        arr[k] = R[j];
        j++;
      }
      k++;
      setArray([...arr]);
      await delay(sortingSpeed);
      setSwappingIndices([]);
    }

    while (i < n1) {
      setSwappingIndices([k]);
      await delay(sortingSpeed);
      arr[k] = L[i];
      i++;
      k++;
      setArray([...arr]);
      await delay(sortingSpeed);
      setSwappingIndices([]);
    }

    while (j < n2) {
      setSwappingIndices([k]);
      await delay(sortingSpeed);
      arr[k] = R[j];
      j++;
      k++;
      setArray([...arr]);
      await delay(sortingSpeed);
      setSwappingIndices([]);
    }
  };

  const insertionSort = async () => {
    let arr = [...array];
    if (isSorted(arr)) {
      toast.info("Array is already sorted!");
      return;
    }
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      setComparingIndices([i, j]);
      await delay(sortingSpeed);
      while (j >= 0 && arr[j] > key) {
        setSwappingIndices([j, j + 1]);
        await delay(sortingSpeed);
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await delay(sortingSpeed);
        setSwappingIndices([]);
        if (j >= 0) setComparingIndices([i, j]);
      }
      setSwappingIndices([j + 1]);
      await delay(sortingSpeed);
      arr[j + 1] = key;
      setArray([...arr]);
      await delay(sortingSpeed);
      setSwappingIndices([]);
      setSortedIndices(prev => [...prev, i]);
    }
    setSortedIndices([...Array(n).keys()]);
    setComparingIndices([]);
  };

  const selectionSort = async () => {
    let arr = [...array];
    if (isSorted(arr)) {
      toast.info("Array is already sorted!");
      return;
    }
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      setComparingIndices([i]);
      for (let j = i + 1; j < n; j++) {
        setComparingIndices([minIdx, j]);
        await delay(sortingSpeed);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        setSwappingIndices([i, minIdx]);
        await delay(sortingSpeed);
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await delay(sortingSpeed);
        setSwappingIndices([]);
      }
      setSortedIndices(prev => [...prev, i]);
    }
    setSortedIndices([...Array(n).keys()]);
    setComparingIndices([]);
  };

  const startSorting = async (sortingFunction, algorithmName) => {
    setIsRunning(true);
    setCurrentAlgorithm(algorithmName);
    await sortingFunction();
    setIsRunning(false);
    setCurrentAlgorithm(null);
  };

  const algorithmButtons = [
    { name: 'Quick Sort', func: () => quickSort([...array], 0, array.length - 1), complexity: 'O(n log n)' },
    { name: 'Merge Sort', func: () => mergeSort([...array], 0, array.length - 1), complexity: 'O(n log n)' },
    { name: 'Bubble Sort', func: bubbleSort, complexity: 'O(n²)' },
    { name: 'Insertion Sort', func: insertionSort, complexity: 'O(n²)' },
    { name: 'Selection Sort', func: selectionSort, complexity: 'O(n²)' },
  ];

  return (
    <div className='App'>
      <ToastContainer />
      <header>
        <h1>Sorting Visualizer</h1>
        <button className="new-array-btn" onClick={generateNewArray} disabled={isRunning}>
          Generate New Array
        </button>
      </header>
      <main>
        <div className="visualizer-container">
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                key={idx}
                className="array-bar"
                style={{
                  height: `${value}%`,
                  backgroundColor: sortedIndices.includes(idx) ? 'var(--color-sorted)' : 
                                   swappingIndices.includes(idx) ? 'var(--color-swapping)' : 
                                   comparingIndices.includes(idx) ? 'var(--color-comparing)' : 'var(--color-unsorted)',
                }}
              ></div>
            ))}
          </div>
          <div className="color-code">
            <div className="color-item"><span style={{backgroundColor: 'var(--color-unsorted)'}}></span> Unsorted</div>
            <div className="color-item"><span style={{backgroundColor: 'var(--color-comparing)'}}></span> Comparing</div>
            <div className="color-item"><span style={{backgroundColor: 'var(--color-swapping)'}}></span> Swapping</div>
            <div className="color-item"><span style={{backgroundColor: 'var(--color-sorted)'}}></span> Sorted</div>
          </div>
        </div>
        <div className="controls">
          <div className="sliders">
            <label>
              Array Size: {arraySize}
              <input 
                type="range" 
                min="5" 
                max="100" 
                value={arraySize} 
                onChange={(e) => setArraySize(Number(e.target.value))}
                disabled={isRunning}
              />
            </label>
            <label>
              Speed: {sortingSpeed}
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={sortingSpeed} 
                onChange={(e) => setSortingSpeed(Number(e.target.value))}
                disabled={isRunning}
              />
            </label>
          </div>
          <div className="algorithm-buttons">
            {algorithmButtons.map((algo) => (
              <button
                key={algo.name}
                className={`algo-btn ${currentAlgorithm === algo.name ? 'active' : ''}`}
                onClick={() => startSorting(algo.func, algo.name)}
                disabled={isRunning}
              >
                {algo.name}
                <div className="complexity">{algo.complexity}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
