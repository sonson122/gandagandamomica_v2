const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('i');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');
const coverArt = document.getElementById('cover-art');

// Play or Pause Audio
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        coverArt.style.animationPlayState = 'running';
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        coverArt.style.animationPlayState = 'paused';
    }
}

playBtn.addEventListener('click', togglePlay);

// Update Duration & Seekbar Max when Metadata Loads
audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
});

// Update Progress & Timestamp during Playback
audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Manual Scrubbing/Adjusting Timestamp
seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
});

// Volume Adjustment
volumeBar.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Format Seconds into MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Reset Controls when Audio Ends
audio.addEventListener('ended', () => {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    coverArt.style.animationPlayState = 'paused';
    seekBar.value = 0;
});