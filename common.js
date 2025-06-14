let audioCtx;
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}
function playBeep(freq = 440, duration = 0.1, type = 'square', vol = 0.5) {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = vol;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}
function startBgm() {
  initAudio();
  if (startBgm.started) return;
  startBgm.started = true;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  gain.gain.value = 0.1;
  osc.connect(gain).connect(audioCtx.destination);
  const notes = [261.63, 329.63, 392.0, 523.25];
  let i = 0;
  function next() {
    osc.frequency.setValueAtTime(notes[i], audioCtx.currentTime);
    i = (i + 1) % notes.length;
  }
  osc.start();
  next();
  setInterval(next, 500);
}
