// Utility functions will be added here as needed
let timeoutId;
export function debounce(func,delay){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func,delay);
}


// Local storage utilities
export const storage = {
    get: (key) => {
      const value = localStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : null;
      } catch (e) {
        return value;
      }
    },
    
    set: (key, value) => {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    }
  };
  