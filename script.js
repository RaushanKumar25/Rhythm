const ad = document.querySelector('.song');
const playing = document.querySelector('.fa-play');
const pauses = document.querySelector('.fa-pause');
const forw = document.querySelect('fa-forward-step');
const ttl = document.querySelector('.title');
const art_img = document.querySelector('#artist');
const art_name = document.querySelector('#name');
const playSong = document.querySelector('#playsong');

const artist_name = ['Prateek Kuhad', 'Elliot James Reay', 'Jubin Nautiyal', 'Arijit Singh' , 'Armaan Malik' , 'Ed Sheeran', 'Shreya Ghosal', 'Vishal Mishra', 'Garry Sandhu'];
const artist_title = ['Co2', 'I Think They Call This Love', 'Raatan Lambiyaan' , 'Tera Hoke Rahoon' , "'Besabriyaan", 'Perfect', 'Rang Jo Lagyo', 'Zindagi Tere Naam Ki', 'Do gallan']

playSong.addEventListener('click',effect)