// js/audio.js
export const FitAudio = (() => {
    let audioCtx = null;
    function init() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }
    function playTone(freq, type, duration, vol = 0.1) {
        const btnAudio = document.getElementById('btnAudio');
        if (!btnAudio || !btnAudio.classList.contains('active')) return;
        init();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }
    return {
        unlock: () => {
            init();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            gain.gain.value = 0; 
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(0);
            osc.stop(audioCtx.currentTime + 0.001);
        },
        beepShort: () => playTone(800, 'sine', 0.1, 0.2),
        beepLong: () => playTone(1200, 'sine', 0.6, 0.3),
        packRip: () => { playTone(150, 'sawtooth', 0.1, 0.1); setTimeout(() => playTone(200, 'sawtooth', 0.2, 0.1), 100); },
        revealNormal: () => { playTone(400, 'square', 0.1, 0.1); setTimeout(() => playTone(600, 'square', 0.3, 0.1), 100); },
        revealEpic: () => { playTone(600, 'square', 0.1, 0.1); setTimeout(() => playTone(800, 'square', 0.1, 0.1), 100); setTimeout(() => playTone(1200, 'square', 0.5, 0.15), 200); },
        repeated: () => { playTone(300, 'triangle', 0.2, 0.1); setTimeout(() => playTone(250, 'triangle', 0.4, 0.1), 200); },
        forge: () => { playTone(800, 'square', 0.05, 0.2); setTimeout(() => playTone(400, 'sawtooth', 0.3, 0.1), 50); }
    };
})();