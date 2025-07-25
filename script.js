
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
// console.log(songs);

let currentSongIndex = 0;

// Song data
const songs = [
    {
        artist: "Elliot James Reay",
        title: "I Think They Call This Love",
        src: "melodies/Elliot James Reay _ I Think They Call This Love _Official Lyric Video_.mp3",
        image: "images/yung kai.jpg"
    },
    {
        artist: "Jubin Nautiyal, Asees Kaur",
        title: "Raataan Lambiyan",
        src: "melodies/Raataan Lambiyan - Lyric Video  Shershaah  Sidharth, Kiara  Tanishk B.  Jubin  Asees.mp3",
        image: "images/raataan lambiyaan.jpg"
    },
    {
        artist: "Ed Sheeran",
        title: "Perfect",
        src: "melodies/Ed Sheeran _ Perfect.mp3",
        image: "images/ed sheeran-perfect.jpg"
    },
    {
        artist: "Ami Mishra, Kunaal Vermaa",
        title: "Hasi Ban Gaye-Male Version",
        src: "melodies/Hasi Ban Gaye (Lyrics) - Ami Mishra, Kunaal Vermaa.mp3",
        image: "images/hamari adhuri kahani.jpg"
    },
    {
        artist: "Kaavish",
        title: "Tere Pyaar Main-Kaavish",
        src: "melodies/Kaavish - Tere Pyaar Main.mp3",
        image: "images/kaavish.jpg"
    },
    {
        artist: "lata mangeshkar",
        title: "Tadpa Lo",
        src: "melodies/Tadpaoge Tadpa Lo - Lyrics  Barkha  Lata Mangeshkar  Trending Songs  Old Hindi Songs.mp3",
        image: "images/tadpa lo.jpg"
    },
    
    {
        artist: "Arijit Singh",
        title: "Main Hoon Saath Tere",
        src: "melodies/ARIJIT SINGH (LYRICAL) - MAIN HOON SAATH TERE  RAJKUMMAR RAO, KRITI KHARBANDA  JAM8.mp3",
        image: "images/shadi mein zaroor aana.jpg"
    },
     {
        artist: "Yaseer Desai, Neha Kakkar",
        title: "Dil Ko Karar Aaya",
        src: "melodies/Dil Ko Karar Aaya (Lyrics) - Sidharth Shukla & Neha Sharma  Neha Kakkar & YasserDesai.mp3",
        image: "images/dil ko karar aaya.jpg"
    },
    {
        artist: "Arijit Singh",
        title: "Raanjhana - Hina Khan & Priyank Sharma",
        src: "melodies/Raanjhana  Arijit Singh  Hina Khan & Priyank Sharmaaa  Asad Khan  Raqueeb Alam  Full Audio.mp3",
        image: "images/raanjhana.jpg"
    },
    
    {
        artist: "Bollywood Mashup",
        title: "Paper Man",
        src: "melodies/Paperman bollywood song mashup..mp3",
        image: "images/paper man.jpeg"
    },
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

// Load song function
function loadSong(song) {
    artistName.textContent = song.artist;
    title.textContent = song.title;
    artistImg.src = song.image;
    audio.src = song.src;

    audio.load();
    
    updateBackground(song.image);
    
    audio.addEventListener('loadedmetadata', () => {
        endTime.textContent = formatTime(audio.duration);
    });
}

// Play/pause function
function togglePlay() {
    if (audio.paused) {
        audio.play()
            .then(() => {
                playBtn.classList.add('none');
                pauseBtn.classList.remove('none');
                artistImg.classList.add('round');
            })
            .catch(error => console.error("Playback failed:", error));
    } else {
        audio.pause();
        playBtn.classList.remove('none');
        pauseBtn.classList.add('none');
        artistImg.classList.remove('round');
    }
}

// Set progress bar when clicked
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Next song function
function forward() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (!audio.paused) {
        audio.play();
    }
}

// Previous song function
function backward() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (!audio.paused) {
        audio.play();
    }
}

// Reset function
function removeEffect() {
    audio.pause();
    audio.currentTime = 0;
    title.classList.remove('run');
    playBtn.classList.remove('none');
    pauseBtn.classList.add('none');
    artistImg.classList.remove('round');
    updateProgress(); // Update time display
}

// Auto-skip broken files
audio.addEventListener('error', () => {
    console.log("Skipping unplayable file:", songs[currentSongIndex].src);
    forward(); // Jump to next song automatically
});


// Event listeners
playSong.addEventListener('click', togglePlay);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', forward); // Auto-play next song when current ends

// Initialize player with first song
loadSong(songs[currentSongIndex]);


// function loadSong(song) {
//     // Your existing song-loading code...
//     updateBackground(song.image); // Add this line
// }



// New function to handle background updates
function updateBackground(imagePath) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Fixes CORS issues
    img.src = imagePath;

    img.onload = function() {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img); // Dominant color
        

        // Convert RGB to HEX
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        
        // Apply to background
        document.body.style.background = `
            linear-gradient(135deg, ${hexColor} 0%, #000000 100%)

        `;
    };
}





