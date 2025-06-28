/**
 * Playback module for the Beat Maker application
 * Handles the sequencing and timing of drum sounds
 */

// Import dependencies
import { elements } from "./dom-elements.js";
import { state } from "./state.js";
import { playSound } from "./pads.js";

/**
 * Plays the active pads for a specific step
 * @param {number} step - The current step in the sequence (0-7)
 */
function playStep(step) {
    const activePads = document.querySelectorAll(`.b${step}.active`);
    
    activePads.forEach(pad => {
        // Add visual feedback for active pads
        pad.style.animation = "playTrack 0.3s alternate ease-in-out 2";
        
        // Play corresponding sound based on pad type
        if (pad.classList.contains("kick-pad")) {
            playSound("kick");
        } else if (pad.classList.contains("snare-pad")) {
            playSound("snare");
        } else if (pad.classList.contains("hihat-pad")) {
            playSound("hihat");
        }
    });
}

/**
 * Updates playback to the next step in the sequence
 */
function updatePlayback() {
    playStep(state.currentStep);
    state.currentStep = (state.currentStep + 1) % 8; // Loop back to 0 after step 7
}

/**
 * Toggles playback on/off
 */
export function togglePlayback() {
    if (state.isPlaying) {
        stopPlayback();
    } else {
        startPlayback();
    }
    updatePlayButton();
}

/**
 * Starts the playback sequence
 */
export function startPlayback() {
    // Clear any existing interval to prevent multiple instances
    if (state.playInterval) clearInterval(state.playInterval);
    
    // Calculate interval based on BPM (converted to milliseconds and divided by 2 for 8th notes)
    const interval = (60 / state.bpm) * 1000 / 2;
    
    // Start the playback interval
    state.playInterval = setInterval(updatePlayback, interval);
    state.isPlaying = true;
}

/**
 * Stops the playback and resets to step 0
 */
export function stopPlayback() {
    clearInterval(state.playInterval);
    state.playInterval = null;
    state.isPlaying = false;
    state.currentStep = 0; // Reset to beginning
}

/**
 * Updates the play button's appearance based on playback state
 */
function updatePlayButton() {
    if (!elements.playBtn) return;
    
    elements.playBtn.textContent = state.isPlaying ? "Stop" : "Play";
    elements.playBtn.classList.toggle("active", state.isPlaying);
}