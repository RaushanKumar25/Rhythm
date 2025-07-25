
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
        artist: "Shreya Ghoshal, Irsad Kamil",
        title: "Saiyaara reprise-Female",
        src: "melodies/Saiyaara (Reprise - Female Version) Lyrics - Shreya Ghoshal, Faheem Abdullah.mp3",
        image: "images/Saiyaara.jpg"
    },
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
        artist: "Arijit Singh",
        title: "Qayde Se",
        src: "melodies/Qayde Se (Lyrical Video)_ Arijit Singh  Pritam  Amitabh Bhattacharya  MetroIn Dino  Anurag Basu.mp3",
        image: "images/metro in dino.jpg"
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
        artist: "Lata Mangeshkar",
        title: "Itna Na Mujhse Tu Pyar Badha",
        src: "melodies/Itna na Mujhse tu pyar badha  Lata Mangeshkar.mp3",
        image: "images/itna na mujhse tu pyar badha.webp"
    },
    
    
    {
        artist: "Bollywood Mashup",
        title: "Paper Man",
        src: "melodies/Paperman bollywood song mashup..mp3",
        image: "images/paper man.jpeg"
    },
];


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


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


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


function forward() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (!audio.paused) {
        audio.play();
    }
}


function backward() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (!audio.paused) {
        audio.play();
    }
}


function removeEffect() {
    audio.pause();
    audio.currentTime = 0;
    title.classList.remove('run');
    playBtn.classList.remove('none');
    pauseBtn.classList.add('none');
    artistImg.classList.remove('round');
    updateProgress(); 
}


audio.addEventListener('error', () => {
    console.log("Skipping unplayable file:", songs[currentSongIndex].src);
    forward(); 
});



playSong.addEventListener('click', togglePlay);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', forward); 


loadSong(songs[currentSongIndex]);






function updateBackground(imagePath) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = imagePath;

    img.onload = function() {
        const colorThief = new ColorThief();
        const [r, g, b] = colorThief.getColor(img); 
        

       
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        
        
        document.body.style.background = `
            linear-gradient(135deg, ${hexColor} 0%, #000000 100%)

        `;
    };
}





