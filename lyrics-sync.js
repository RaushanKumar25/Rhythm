// const audio = document.getElementById('audio');
// console.log("Loaded")
// const lyricsDisplay = document.getElementById('lyricsDisplay');
// const lyricsToggle = document.getElementById('lyricsToggle');

// let currentLyrics = [];

// // Toggle button
// lyricsToggle.addEventListener('click', () => {
//   lyricsDisplay.classList.toggle('active');
// });

// // Load lyrics from JSON
// function loadLyrics(songFile) {
//   fetch('lyrics.json')
//     .then(res => res.json())
//     .then(data => {
//       const lyrics = data[songFile];
//       if (!lyrics || lyrics.length === 0) {
//         lyricsDisplay.innerHTML = `<div class="lyrics-placeholder"><p>No lyrics found</p></div>`;
//         return;
//       }

//       lyricsDisplay.innerHTML = '';
//       currentLyrics = lyrics;

//       currentLyrics.forEach(line => {
//         const lineEl = document.createElement('div');
//         lineEl.className = 'lyrics-line';
//         lineEl.textContent = line.text;
//         lineEl.dataset.time = line.time;
//         lyricsDisplay.appendChild(lineEl);
//       });
//     });
// }

// // Highlight current lyric
// function updateLyrics(currentTime) {
//   const lines = document.querySelectorAll('.lyrics-line');
//   let activeLineIndex = -1;

//   currentLyrics.forEach((line, index) => {
//     if (currentTime >= line.time) {
//       activeLineIndex = index;
//     }
//   });

//   lines.forEach((line, index) => {
//     line.classList.toggle('active', index === activeLineIndex);
//     if (index === activeLineIndex) {
//       line.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   });
// }

// // Event: Update lyric line during playback
// audio.addEventListener('timeupdate', () => {
//   updateLyrics(audio.currentTime);
// });

// // Event: Load lyrics on song load
// audio.addEventListener('loadeddata', () => {
//   const songFilename = audio.src.split('/').pop();
//   loadLyrics(songFilename);
// });


// document.addEventListener('DOMContentLoaded', () => {
//   fetch('lyrics.json')
//     .then(response => {
//       if (!response.ok) throw new Error('Lyrics file not found');
//       return response.json();
//     })
//     .then(lyrics => {
//       const display = document.getElementById('lyricsDisplay');
//       const placeholder = document.getElementById('lyricsPlaceholder');

//       placeholder.style.display = 'none'; // Hide the placeholder

//       lyrics.forEach(line => {
//         const div = document.createElement('div');
//         div.className = 'lyrics-line';
//         div.dataset.time = line.time;
//         div.textContent = line.text;
//         display.appendChild(div);
//       });
//     })
//     .catch(error => {
//       console.error('Error loading lyrics:', error);
//     });
// });
