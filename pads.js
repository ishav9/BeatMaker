import { state } from "./state.js";


export function playSound(type){
  const audio = state.audioElements[type]
  if(audio){
    audio.currentTime = 0
    audio.play()
  }
}

function togglePad(pad){
  pad.classList.toggle("active")
}

export function padClickedHandler(pad){
    togglePad(pad)
    const track = pad.classList[1].split("-")[0];
    playSound(track)
}