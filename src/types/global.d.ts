declare global {
    interface Window {
      ethereum?: any; // Замініть "any" на точний тип, якщо використовуєте бібліотеки типу 'ethers' або 'web3'
    }
  }
  
  export {}; // Це потрібно, щоб уникнути помилки про дублікат декларацій
  