import { state } from './state.js';
import { elements } from './dom-elements.js';
import { storage } from './utils.js';
import { stopPlayback , startPlayback } from './play.js';


// Update the tempo display in the UI
// fast function
export function updateTempoDisplay() {
  elements.tempoNumber.value = state.bpm;
  elements.tempoSlider.value = state.bpm;

  const tempoDisplay = document.querySelector("#current-tempo");
  tempoDisplay.textContent = `${state.bpm} BPM`;
  
  const minVal = elements.tempoSlider.min;
  const maxVal = elements.tempoSlider.max;
  const percent = ((state.bpm - minVal) / (maxVal - minVal)) * 100;
  elements.tempoSlider.style.background = `linear-gradient(90deg, #72ddf7 0%, #b388ff ${percent}%, rgba(255, 255, 255, 0.1) ${percent}%)`;
}

// slow function 
export function saveTempoToStorage() {
  storage.set("bpm", state.bpm);
}


// Handle tempo input changes
export function handleTempoInput(e) {
  let newBpm = parseInt(e.target.value, 10);
  
  // Validate BPM range
  newBpm = Math.max(20, Math.min(400, newBpm || 150));
  
  // Update both inputs
  if (elements.tempoSlider) elements.tempoSlider.value = newBpm;
  if (elements.tempoNumber) elements.tempoNumber.value = newBpm;
  
  // Update display and state
  updateTempoDisplay(newBpm);
  state.bpm = newBpm;
  
  // Restart playback if currently playing
  if (state.isPlaying) {
    stopPlayback();
    startPlayback();
  }
}

// Initialize tempo
export function initTempo() {
  state.bpm = storage.get("bpm") || 200; // Default BPM
  updateTempoDisplay();
}
