const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const title = document.querySelector('.title');
const artistImg = document.getElementById('artist');
const artistName = document.getElementById('name');
const playSong = document.getElementById('playsong');
const startTime = document.getElementById('start');
const endTime = document.getElementById('end');
const lineChild = document.querySelector('.lineChild');
const progressBar = document.querySelector('.line');

// Song data
const songs = [
    // {
    //     name: "Elloit James Reay",
    //     title: "I Think They Call This Love",
    //     src: "melodies/Elliot James Reay _ I Think They Call This Love _Official Lyric Video_.mp3",
    //     image: "images/yung kai.jpg"
    // }
    {
        artist: "Ed Sheeran",
        title: "Perfect",
        src: "melodies/Ed Sheeran _ Perfect.mp3",
        image: "images/ed sheeran-perfect.jpg"
    }
];

// Format time (seconds to mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar
function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    lineChild.style.width = `${progressPercent}%`;
    startTime.textContent = formatTime(currentTime);
    
    if (duration) {
        endTime.textContent = formatTime(duration);
    }
}

// Play/pause function
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.classList.add('none');
        pauseBtn.classList.remove('none');
        artistImg.classList.add('center round'); // Add this line
    } else {
        audio.pause();
        playBtn.classList.remove('none');
        pauseBtn.classList.add('none');
        artistImg.classList.remove('center round'); // Add this line
    }
}

// Set progress bar when clicked
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playSong.addEventListener('click', togglePlay);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    pauseBtn.classList.add('none');
    playBtn.classList.remove('none');
    artistImg.classList.remove('round');
    lineChild.style.width = '0%';
    startTime.textContent = '0:00';
});

// Initialize
audio.addEventListener('loadedmetadata', () => {
    endTime.textContent = formatTime(audio.duration);
});

// Placeholder functions for forward/backward
function forward() {
    // Implement skip forward logic
    console.log('Forward button clicked');
}

function backward() {
    // Implement skip backward logic
    console.log('Backward button clicked');
}

