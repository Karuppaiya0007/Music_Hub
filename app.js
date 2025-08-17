let playlist = [];
let currentIndex = 0;
let shuffle = false;
const player = document.getElementById('player');
const playlistDiv = document.getElementById('playlist');

document.getElementById('fileInput').addEventListener('change', e => {
  const files = Array.from(e.target.files);
  playlist = files.map(file => ({name: file.name, url: URL.createObjectURL(file)}));
  currentIndex = 0;
  renderPlaylist();
  loadTrack();
});

function renderPlaylist(){
  playlistDiv.innerHTML = '';
  playlist.forEach((track, i) => {
    const div = document.createElement('div');
    div.textContent = (i===currentIndex? '▶ ' : '') + track.name;
    playlistDiv.appendChild(div);
  });
}

function loadTrack(){
  if(playlist.length === 0) return;
  player.src = playlist[currentIndex].url;
  renderPlaylist();
}

function togglePlay(){
  if(player.paused) player.play(); else player.pause();
}
function nextTrack(){
  if(playlist.length === 0) return;
  if(shuffle){
    currentIndex = Math.floor(Math.random()*playlist.length);
  } else {
    currentIndex = (currentIndex+1) % playlist.length;
  }
  loadTrack();
  player.play();
}
function prevTrack(){
  if(playlist.length === 0) return;
  if(shuffle){
    currentIndex = Math.floor(Math.random()*playlist.length);
  } else {
    currentIndex = (currentIndex-1+playlist.length)%playlist.length;
  }
  loadTrack();
  player.play();
}
function toggleShuffle(){
  shuffle = !shuffle;
  alert('Shuffle: '+(shuffle?'ON':'OFF'));
}

// Background stars
const bg = document.getElementById('background');
for(let i=0;i<60;i++){
  const star=document.createElement('div');
  star.className='star';
  star.style.top=Math.random()*100+'%';
  star.style.left=Math.random()*100+'%';
  star.style.animationDuration=(1+Math.random()*2)+'s';
  bg.appendChild(star);
}

// Service worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}
