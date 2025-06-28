// Import modules
import { elements } from "./dom-elements.js";
import { state } from "./state.js";
import { handleTempoInput, initTempo } from "./tempo-handler.js";
import { padClickedHandler } from "./pads.js";
import { togglePlayback } from "./play.js";

// Setup event listeners
function setupEventListeners() {
  elements.tempoSlider.addEventListener("input", handleTempoInput);
  elements.tempoNumber.addEventListener("change", handleTempoInput);

  elements.pads.forEach((pad) => {
    pad.addEventListener("click", () => {
      padClickedHandler(pad);
    });
    pad.addEventListener("animationend", (e) => {
      e.target.style.animation = "";
    });
  });

  elements.muteBtns.forEach((btn) => {
    btn.addEventListener("click", toggleMute);
  });

  // Play button
  elements.playBtn?.addEventListener("click", togglePlayback);
}

function setupAudioelements() {
  state.audioElements = {
    kick: elements.kickAudio,
    snare: elements.snareAudio,
    hihat: elements.hihatAudio,
  };

  Object.entries(state.audioElements).forEach(([key, element]) => {
    if (element) element.src = state.sounds[key];
  });

  // sound selection
  elements.selects.forEach((select) => {
    select.addEventListener("change", handleSoundChange);
  });
}

function handleSoundChange(e) {
  const type = e.target.name.replace("-select", "");
  if (state.audioElements[type]) {
    state.audioElements[type].src = e.target.value;
  }
}

function toggleMute(e) {
  const trackIndex = e.target.getAttribute("data-track");
  console.log(trackIndex);
  const tracks = ["kick", "snare", "hihat"];
  const track = tracks[trackIndex];
  console.log(tracks[trackIndex]);
  if (!track || !state.audioElements[track]) return;
  const isMuted = e.target.classList.toggle("active");
  console.log(isMuted, "return by class list");
  state.audioElements[track].volume = isMuted ? 0 : 1;
}

// Initialize the application
function init() {
  initTempo();
  setupEventListeners();
  setupAudioelements();
}

// Start the app when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
